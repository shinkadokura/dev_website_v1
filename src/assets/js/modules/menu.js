
// export文を使ってmenu関数を定義する。
export function menu() {
  // console.log('menuok');

  document.getElementById('menuBtn').addEventListener('click', function() {
    this.classList.add('open');
    document.getElementById('gNavi').classList.add('open');
  });
  
  document.getElementById('closeBtn').addEventListener('click', function() {
    this.classList.remove('open');
    document.getElementById('gNavi').classList.remove('open');
  });
  
  document.querySelectorAll('#spNavi a').forEach(function(link) {
    link.addEventListener('click', function() {
      this.classList.remove('open');
      document.getElementById('gNavi').classList.remove('open');
    });
  });

  document.querySelectorAll('.cate_select dt').forEach(function(dt) {
    dt.addEventListener('click', function() {
      dt.classList.toggle('open');
  
      const dd = dt.nextElementSibling;
      if (dd && dd.tagName.toLowerCase() === 'dd') {
        dd.classList.toggle('open');
      }
    });
  });


  // タブメニューのボタンとコンテンツを取得
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// 各タブボタンにクリックイベントを追加
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // すべてのタブボタンとコンテンツのアクティブ状態をリセット
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // クリックされたボタンと対応するコンテンツをアクティブに設定
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// すべての .form_box h4 要素を取得
const headings = document.querySelectorAll('.form_box h4');

// 各見出しにクリックイベントリスナーを追加
headings.forEach(function(heading) {
    heading.addEventListener('click', function() {
        // 次の .sub 要素を取得
        const sub = this.nextElementSibling;
        
        // .sub 要素が存在し、クラスが 'sub' である場合
        if (sub && sub.classList.contains('sub')) {
            // 'open' クラスをトグル
            sub.classList.toggle('open');
        }
    });
});


}