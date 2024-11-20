
export function search() {
  console.log('search');


  // チェックボックスのチェック状態を監視
document.querySelectorAll('#myForm input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', updateCheckword);
});

// チェックされたチェックボックスのラベルテキストを#checkwordに表示する関数
function updateCheckword() {
  const checkwordDiv = document.getElementById('checkword');
  checkwordDiv.innerHTML = ''; // 初期化

  // チェックされたチェックボックスのラベルテキストを取得し、出力
  document.querySelectorAll('#myForm input[type="checkbox"]:checked').forEach((checkedBox) => {
      const label = checkedBox.parentNode; // ラベル要素を取得
      const labelText = label.textContent.trim(); // ラベルテキストを取得

      // テキストを<span>で囲んで#checkwordに追加
      const span = document.createElement('span');
      span.textContent = labelText;
      checkwordDiv.appendChild(span);
  });
}

// ページ読み込み時に初回実行
document.addEventListener('DOMContentLoaded', updateCheckword);



}