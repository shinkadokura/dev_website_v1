
// export文を使ってscroll関数を定義する。
export function scroll() {
//   console.log('scroll');

  // scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        
        const speed = 500;
        const href = this.getAttribute("href");
        const target = href === "#" || href === "" ? document.documentElement : document.querySelector(href);
        
        if (target) {
            const position = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        }
    });
});


}