document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#danh-sach-tai-lieu a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Bạn đã chọn: ' + this.textContent);
        });
    });
}); 

// 3D Hover Tilt
const tiltCard = document.querySelector('.tilt-card');
if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        tiltCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        tiltCard.classList.add('active');
    });
    tiltCard.addEventListener('mouseleave', () => {
        tiltCard.style.transform = '';
        tiltCard.classList.remove('active');
    });
}

// Parallax 3D Layers
const parallaxDemo = document.querySelector('.parallax-demo');
if (parallaxDemo) {
    parallaxDemo.addEventListener('mousemove', (e) => {
        const rect = parallaxDemo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;
        parallaxDemo.querySelector('.layer1').style.transform = `translate(${moveX}px, ${moveY}px)`;
        parallaxDemo.querySelector('.layer2').style.transform = `translate(${-moveX * 1.5}px, ${-moveY * 1.5}px)`;
        parallaxDemo.querySelector('.layer3').style.transform = `translate(${moveX * 2}px, ${-moveY * 2}px)`;
    });
    parallaxDemo.addEventListener('mouseleave', () => {
        parallaxDemo.querySelector('.layer1').style.transform = '';
        parallaxDemo.querySelector('.layer2').style.transform = '';
        parallaxDemo.querySelector('.layer3').style.transform = '';
    });
} 

// Ẩn/hiện các card thông tin với hiệu ứng 3D không gian sâu, chuyển tiếp giữa các vùng
const mainMenu = document.getElementById('main-menu');
const space3d = document.getElementById('space-3d');
const mainBtns = document.querySelectorAll('.main-btn');
const sideBtns = document.querySelectorAll('.side-btn');
const cards = {
    profile: document.getElementById('profile-card'),
    product: document.getElementById('product-card'),
    demo: document.getElementById('demo-card')
};

function showSpace(cardKey) {
    mainMenu.classList.add('menu-out');
    setTimeout(() => {
        mainMenu.style.display = 'none';
        space3d.classList.add('active');
        switchCard(cardKey);
    }, 600);
}
function switchCard(cardKey) {
    for (const key in cards) {
        cards[key].classList.remove('active');
        cards[key].style.display = 'none';
    }
    cards[cardKey].classList.add('active');
    cards[cardKey].style.display = 'block';
    // Ẩn nút bên cho card đang active
    sideBtns.forEach(btn => {
        if (btn.dataset.card === cardKey) {
            btn.style.visibility = 'hidden';
        } else {
            btn.style.visibility = 'visible';
        }
    });
}
mainBtns.forEach(btn => {
    btn.onclick = () => showSpace(btn.dataset.card);
});
sideBtns.forEach(btn => {
    btn.onclick = () => switchCard(btn.dataset.card);
});

const cube = document.getElementById('cube3d');
const hotspots = document.querySelectorAll('.cube-hotspot');

const faceAngles = {
    profile: 0,
    product: -120,
    demo: -240
};

function rotateCube(face) {
    const angle = faceAngles[face] || 0;
    cube.style.transform = `rotateY(${angle}deg)`;
}
hotspots.forEach(btn => {
    btn.onclick = () => rotateCube(btn.dataset.face);
});
// Khởi tạo cube ở mặt profile
rotateCube('profile');

// Nút chia sẻ link
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.onclick = function() {
        const shareUrl = 'https://khoinghiep2025.vercel.app/';
        if (navigator.share) {
            navigator.share({
                title: 'Dự Án Khởi Nghiệp 2025',
                text: 'Khám phá dự án Startup Connect!',
                url: shareUrl
            }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Đã sao chép link vào clipboard!');
            }, () => {
                alert('Không thể sao chép link. Vui lòng copy thủ công: ' + shareUrl);
            });
        } else {
            alert('Vui lòng copy link: ' + shareUrl);
        }
    };
} 