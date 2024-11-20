import '../scss/styles.scss';

// ページ読み込み完了時にクラスを追加してフェードインを実行
window.addEventListener('load', function() {
  document.body.classList.add('fade-in');
});



import { menu } from "./modules/menu";
import { scroll } from "./modules/scroll";
// import { search } from "./modules/search";
// import { scrollVisibleHide } from "./modules/scrollVisibleHide";


menu();
scroll();
// search();
// scrollVisibleHide();
