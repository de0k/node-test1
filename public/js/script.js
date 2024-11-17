// JSON 파일에서 데이터 가져오기
/* 
    fetch : 네트워크 요청(서버에 데이터 요청)을 수행하는 JS 함수.

    주로 HTTP 요청(웹에서 정보를 요청하는 표준 프로토콜. 
    GET/POST/PUT/DELETE. 요청은 URL,헤더,본문 등을 포함)을 처리.

    프로미스(비동기 작업의 완료(then) 또는 실패(catch)를 반환하여
    비동기적(다른 작업들을 기다리지 않고 서버에 요청)으로 데이터를 가져올수 있음
*/

// JSON 파일에서 데이터 가져오기
// async -> 함수가 항상 항상 Promise를 반환
async function fetchLocations() {
    try {
        const response = await fetch('/api/locations'); // 데이터베이스 API 호출
        return await response.json(); 
        // await -> 프로미스가 해결될 때까지 실행을 멈추고 해결된 후 다음 줄로 진행
        // 서버에서 응답받은 데이터를 json형태로 변환 및 response 객체에 받음
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function init() {
    const locations = await fetchLocations();
    // 왼쪽에 장소 목록
    const locationList = document.getElementById('location-list'); 
    // 장소에 대한 추가 정보
    const detailBox = document.getElementById('detail-box'); 
    const closeButton = document.getElementById('close-button');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    // 상세보기 활성화 여부 체크 
    let activeMoreButton = null; 
    // 마커 활성화 여부 체크
    let activeMarker = null; 
    let markers = []; // 마커 저장 배열

    // 지도 생성
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(36.462444, 127.112976), 
            level: 6 
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도 우측 상단 (지도/스카이뷰)
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 장소 목록 생성
    // prtnrsNo가 pk이고 쿼리문을 'SELECT * FROM locations' 별도의 명시된 것 없이 
    // 이렇게 하여 오름차순 출력
    /* 
        locations객체에 forEach를 사용하여 반복작업 수행.
        locations의 각 요소가 location 변수에 할당되어 사용
    */
    locations.forEach(location => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="top_box">
                <div class="left">
                    <div class="icon"></div>
                    <p class="text">${location.category}</p>
                </div>
                <button type="button" class="more">상세보기 <span class="btn"></span></button>
            </div>
            <h2 class="conmNm">${location.conmNm}</h2>
            <p class="addr">${location.addr}</p>
        `;

        // 커스텀 마커 생성
        var markerPosition = new kakao.maps.LatLng(location.lat, location.lot);
        var customMarker = document.createElement('div');
        customMarker.className = 'custom-marker';

        var marker = new kakao.maps.CustomOverlay({
            position: markerPosition,
            content: customMarker,
            yAnchor: 1 
        });
        // yAnchor: 마커의 수직 정렬을 조정

        marker.setMap(map); // 마커를 지도에 표시
        markers.push({ marker, location }); // 마커와 위치 정보를 함께 저장

        const moreButton = listItem.querySelector('.more');
        moreButton.addEventListener('click', () => {
            resetActiveElements(); // 이전 활성화 요소 초기화
            resetAndShowDetail(location, marker, moreButton); // 초기화 후 상세 정보 보여주기
        });

        customMarker.addEventListener('click', () => {
            moreButton.click(); 
        });

        locationList.appendChild(listItem);
    });

    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        const foundLocation = locations.find(loc => loc.conmNm.includes(searchTerm));
        // find - 배열의 각 요소에 대해 제공된 테스트 함수를 실행하고, 그 테스트를 통과하는 첫 번째 요소를 반환
        
        if (foundLocation) {
            const foundMarker = markers.find(m => m.location.conmNm === foundLocation.conmNm);
            if (foundMarker) {
                resetActiveElements(); // 이전 활성화 요소 초기화
                resetAndShowDetail(foundLocation, foundMarker.marker, null);
                // 활성화된 요소 업데이트
                updateActiveElements(foundLocation.conmNm);
            }
        } else {
            alert('검색 결과가 없습니다.');
            resetActiveElements(); // 검색 결과가 없을 때도 활성화 해제
        }
    });

    // 활성화된 요소들을 해제하는 함수
    function resetActiveElements() {
        if (activeMoreButton) {
            activeMoreButton.classList.remove('active');
            const previousLeft = activeMoreButton.parentElement.querySelector('.left');
            if (previousLeft) {
                previousLeft.classList.remove('active-left');
            }
            activeMoreButton = null; // 초기화
        }

        if (activeMarker) {
            activeMarker.getContent().classList.remove('active');
            activeMarker = null; // 초기화
        }

        // 검색 결과에 해당하는 요소 해제
        updateActiveElements("");
    }

    // 검색 결과에 해당하는 요소(more,left) 활성화 및 해제
    function updateActiveElements(conmNm) {
        const listItems = locationList.querySelectorAll('li');
        listItems.forEach(item => {
            const itemConmNm = item.querySelector('.conmNm').innerText;
            const moreButton = item.querySelector('.more');
            const leftElement = item.querySelector('.left');
            
            if (itemConmNm === conmNm) {
                moreButton.classList.add('active');
                if (leftElement) {
                    leftElement.classList.add('active-left');
                }
            } else {
                moreButton.classList.remove('active');
                if (leftElement) {
                    leftElement.classList.remove('active-left');
                }
            }
        });
    }

    // 상세 정보를 보여주는 함수
    function showDetail(location, marker, moreButton) {
        resetActiveElements();

        if (moreButton) {
            moreButton.classList.add('active');
            activeMoreButton = moreButton; // 여기서 activeMoreButton을 설정
            const currentLeft = moreButton.parentElement.querySelector('.left');
            if (currentLeft) {
                currentLeft.classList.add('active-left');
            }
        }

        document.getElementById('category-text').innerText = location.category;
        document.getElementById('detail-conmNm').innerText = location.conmNm;
        document.getElementById('detail-addr').innerText = location.addr;
        document.getElementById('detail-tel').innerText = location.strTelno;

        document.getElementById('detail-des').querySelector('.text').innerText = location.conts || '';
        document.getElementById('detail-des').style.display = location.conts ? 'flex' : 'none';

        const descriptionElement = document.getElementById('detail-description');
        if (location.description) {
            descriptionElement.innerHTML = location.description;
            descriptionElement.style.display = 'block'; 
        } else {
            descriptionElement.innerHTML = '';
            descriptionElement.style.display = 'none'; 
        }

        marker.getContent().classList.add('active'); 
        activeMarker = marker; 
        detailBox.style.display = 'grid'; 
        map.panTo(marker.getPosition());
        map.setLevel(4, { anchor: marker.getPosition() });
    }

    // 초기화 후 상세 정보 보여주는 함수
    function resetAndShowDetail(location, marker, moreButton) {
        // 지도 원래 상태로 복구
        map.setLevel(6); 
        map.panTo(new kakao.maps.LatLng(36.462444, 127.112976));
        
        // 상세 정보 보여주기
        showDetail(location, marker, moreButton);
    }

    // 닫기 버튼 클릭 이벤트
    closeButton.addEventListener('click', () => {
        detailBox.style.display = 'none';
        resetActiveElements(); // 활성화된 요소 해제

        // 지도 원래 상태로 복구
        map.setLevel(6); 
        map.panTo(new kakao.maps.LatLng(36.462444, 127.112976)); 

        // 활성화된 more 버튼과 left 요소의 active 클래스 제거
        const listItems = locationList.querySelectorAll('li');
        listItems.forEach(item => {
            const moreButton = item.querySelector('.more');
            const leftElement = item.querySelector('.left');
            if (moreButton) {
                moreButton.classList.remove('active');
            }
            if (leftElement) {
                leftElement.classList.remove('active-left');
            }
        });
    });
}

// 초기화 함수 호출
init();
