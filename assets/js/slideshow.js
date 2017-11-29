'use strict';

(function () {
  function Slideshow (slideshow) {
    this.slideshow = slideshow
    this.slidesContainer = slideshow.querySelector('.slideshow__container')
    this.slides = slideshow.querySelectorAll('.slide')

    if (this.slides.length > 1) {
      this.currentSlide = 0
      this.slideWidth = this.slideshow.offsetWidth

      this.showIndicators = this.slideshow.classList.contains('slideshow--with-indicators')

      this.setHeightToCurrentSlide()

      window.addEventListener('resize', this.handleWindowDidResize.bind(this))

      window.addEventListener('load', this.setHeightToCurrentSlide.bind(this))

      var prevButton = document.createElement('div')
      var nextButton = document.createElement('div')

      prevButton.classList.add('slideshow-button', 'slideshow__prev-button')
      nextButton.classList.add('slideshow-button', 'slideshow__next-button')

      prevButton.addEventListener('click', this.prevSlide.bind(this))
      nextButton.addEventListener('click', this.nextSlide.bind(this))

      this.slidesContainer.appendChild(prevButton)
      this.slidesContainer.appendChild(nextButton)

      // Catch next buttons
      Array.prototype.forEach.call(this.slideshow.querySelectorAll('.next-button'), (function (btn, index) {
        btn.addEventListener('click', this.nextSlide.bind(this))
      }).bind(this))

      Array.prototype.forEach.call(this.slides, (function (slide) {
        slide.style.position = 'absolute'
        slide.style.transition = 'transform 1s'
      }))

      if (this.showIndicators) {
        var indicators = document.createElement('ul')
        indicators.classList.add('slideshow__indicators')

        Array.prototype.forEach.call(this.slides, (function (_, index) {
          var indicator = document.createElement('li')
          indicator.classList.add('slideshow__indicator', 'slideshow-indicator')
          indicator.setAttribute('role', 'button')
          indicator.addEventListener('click', this.goToSlide.bind(this, index))
          indicators.appendChild(indicator)
        }).bind(this))

        this.slidesContainer.appendChild(indicators)
      }

      this.setSlideAnchorPositions()

      if (this.slideshow.dataset.interval) {
        this.interval = Number(this.slideshow.dataset.interval)

        this.slideshow.addEventListener('mouseover', this.clearInterval.bind(this))
        this.slideshow.addEventListener('mouseout', this.setInterval.bind(this))

        this.setInterval()
      }
    }
  }

  Slideshow.prototype.setInterval = function () {
    this.to = setInterval(this.nextSlide.bind(this), this.interval)
  }

  Slideshow.prototype.clearInterval = function () {
    this.to && clearInterval(this.to)
  }

  Slideshow.prototype.handleWindowDidResize = function () {
    // If the slidewidth has changed, update our stored width and reposition the slides.
    if (this.slideshow.offsetWidth !== this.slideWidth) {
      this.slideWidth = this.slideshow.offsetWidth
      this.setSlideAnchorPositions()
    }
  }

  Slideshow.prototype.setSlideAnchorPositions = function () {
    // For the closure.
    var slideWidth = this.slideWidth

    Array.prototype.forEach.call(this.slides, function (slide, index) {
      // Remove the transitions while we reseat all the slides (including the call to
      // `setSlidePositions` below)
      slide.style.transition = 'none'

      slide.style.left = (slideWidth * index) + 'px'

      // Reintroduce the transition after this function has finished processing (i.e. after the call
      // to `setSlidePositions` below, because that's the way `setTimeout` works).
      setTimeout(function () {
        slide.style.transition = 'transform 1s'
      }, 0)
    })

    this.setSlidePositions()
  }

  Slideshow.prototype.prevSlide = function () {
    this.goToSlide(this.currentSlide - 1)
  }

  Slideshow.prototype.nextSlide = function () {
    this.goToSlide(this.currentSlide + 1)
  }

  Slideshow.prototype.goToSlide = function (slide) {
    this.currentSlide = slide

    // Wrap slide number
    if (this.currentSlide < 0) {
      this.currentSlide = this.slides.length - 1
    }
    if (this.currentSlide >= this.slides.length) {
      this.currentSlide = 0
    }

    this.setSlidePositions()
  }

  Slideshow.prototype.setHeightToCurrentSlide = function () {
    this.slidesContainer.style.height = this.slides[this.currentSlide].offsetHeight + 'px'
  }

  Slideshow.prototype.setSlidePositions = function () {
    // For the closure.
    var slideWidth = this.slideWidth
    var currentSlide = this.currentSlide

    // Set the correct indicator to "active".
    Array.prototype.forEach.call(this.slideshow.querySelectorAll('.slideshow-indicator'), function (indicator, index) {
      if (index === currentSlide) {
        indicator.classList.add('slideshow-indicator--selected')
      } else {
        indicator.classList.remove('slideshow-indicator--selected')
      }
    })

    Array.prototype.forEach.call(this.slides, function (slide) {
      slide.style.transform = 'translateX(-' + (slideWidth * currentSlide) + 'px)'
    })

    this.setHeightToCurrentSlide()
  }

  /////////////////////////////////////////////////////////////////////////////

  // Bootstrap any slideshows

  function documentReady () {
    return (document.readyState === 'interactive' || document.readyState === 'complete')
  }

  function bootstrap () {
    document.removeEventListener('readystatechange', bootstrap)

    var slideshows = document.querySelectorAll('.slideshow')

    Array.prototype.forEach.call(slideshows, function (slideshow) {
      new Slideshow(slideshow)
    })
  }

  if (documentReady()) {
    bootstrap()
  } else {
    document.addEventListener('readystatechange', bootstrap)
  }
}())
