'use strict';

(function () {
  function ScalingForm (scalingForm) {
    this.scalingForm = scalingForm

    this.watchValueChange('base_font_size')
    this.watchValueChange('base_line_height')
    this.watchValueChange('font_size_multiplier--mobile')
    this.watchValueChange('font_size_multiplier--tablet')
    this.watchValueChange('font_size_multiplier--desktop')
    this.watchValueChange('line_height_ratio_multiplier')
    this.watchValueChange('font_size_ratio_multiplier--mobile')
    this.watchValueChange('font_size_ratio_multiplier--tablet')
    this.watchValueChange('font_size_ratio_multiplier--desktop')
  }

  ScalingForm.prototype.watchValueChange = function (key) {
    var listener = function (e) {
      this[key] = parseFloat(e.target.value)

      this.updateValues()
    }

    listener = listener.bind(this)

    var element = this.scalingForm.querySelector('[name=' + key + ']')

    if (element) {
      element.addEventListener('change', listener)
      element.addEventListener('input', listener)

      listener({ target: element })
    }
  }

  ScalingForm.prototype.updateValues = function () {
    var mobileFontSize = this['base_font_size'] * this['font_size_multiplier--mobile']
    var tabletFontSize = this['base_font_size'] * this['font_size_multiplier--tablet']
    var desktopFontSize = this['base_font_size'] * this['font_size_multiplier--desktop']

    this.setOutput('font-size-mobile', this.formatNumber(mobileFontSize))
    this.setOutput('font-size-tablet', this.formatNumber(tabletFontSize))
    this.setOutput('font-size-desktop', this.formatNumber(desktopFontSize))
    this.setOutput('font-line-height', this.formatNumber(this['base_line_height']))

    this.setOutput('micro-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], -2)))
    this.setOutput('small-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], -1)))
    this.setOutput('normal-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], 0)))
    this.setOutput('emphasis-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], 1)))
    this.setOutput('medium-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], 2)))
    this.setOutput('large-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], 3)))
    this.setOutput('hero-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], 4)))
    this.setOutput('jumbo-mobile', this.formatNumber(mobileFontSize * Math.pow(this['font_size_ratio_multiplier--mobile'], 5)))

    this.setOutput('micro-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], -2)))
    this.setOutput('small-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], -1)))
    this.setOutput('normal-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], 0)))
    this.setOutput('emphasis-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], 1)))
    this.setOutput('medium-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], 2)))
    this.setOutput('large-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], 3)))
    this.setOutput('hero-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], 4)))
    this.setOutput('jumbo-tablet', this.formatNumber(tabletFontSize * Math.pow(this['font_size_ratio_multiplier--tablet'], 5)))

    this.setOutput('micro-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], -2)))
    this.setOutput('small-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], -1)))
    this.setOutput('normal-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], 0)))
    this.setOutput('emphasis-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], 1)))
    this.setOutput('medium-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], 2)))
    this.setOutput('large-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], 3)))
    this.setOutput('hero-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], 4)))
    this.setOutput('jumbo-desktop', this.formatNumber(desktopFontSize * Math.pow(this['font_size_ratio_multiplier--desktop'], 5)))

    this.setOutput('micro-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], -2)))
    this.setOutput('small-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], -1)))
    this.setOutput('normal-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], 0)))
    this.setOutput('emphasis-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], 1)))
    this.setOutput('medium-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], 2)))
    this.setOutput('large-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], 3)))
    this.setOutput('hero-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], 4)))
    this.setOutput('jumbo-line-height', this.formatNumber(this['base_line_height'] * Math.pow(this['line_height_ratio_multiplier'], 5)))
  }

  ScalingForm.prototype.formatNumber = function (number) {
    return Math.round(number * 1e4) / 1e4
  }

  ScalingForm.prototype.setOutput = function (key, value) {
    this.scalingForm.querySelector('[data-key=' + key + ']').innerHTML = value
  }

  /////////////////////////////////////////////////////////////////////////////

  // Bootstrap any scaling forms

  function documentReady () {
    return (document.readyState === 'interactive' || document.readyState === 'complete')
  }

  function bootstrap () {
    document.removeEventListener('readystatechange', bootstrap)

    var scalingForms = document.querySelectorAll('.scaling-form')

    Array.prototype.forEach.call(scalingForms, function (scalingForm) {
      new ScalingForm(scalingForm)
    })
  }

  if (documentReady()) {
    bootstrap()
  } else {
    document.addEventListener('readystatechange', bootstrap)
  }
}())
