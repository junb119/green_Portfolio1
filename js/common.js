// ---------------------------header
export function headerModule() {
  return () => {
    const header = document.querySelector('header')
    const headerHeight = header.offsetHeight
    const gnbTitle = header.querySelectorAll('.gnbTitle')

    for (let title of gnbTitle) {
      title.addEventListener('mouseenter', ()=> {
        header.style.height = title.querySelector('.gnbMenu').offsetHeight + 'px'
        console.log(header.offsetHeight)
      })

      title.addEventListener('mouseleave', ()=> {
        header.style.height = headerHeight + 'px'
      })
    }
  }
}