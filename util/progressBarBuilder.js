///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Number} pages
 * @param {Number} page
 * @param {String} progressSlider // Makes it so it can be customized if wanted (future idea maybe)
 * @param {String} emptySlide // Makes it so it can be customized if wanted (future idea maybe)
 * @returns {String} Progress bar
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Progress bar maker ////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = progressBarBuilder = async(pages, page, progressSlider = "▣", emptySlider = "▢") => {
   // Progress maths
   const progress = page + 1;
   const emptyProgress = pages - (page + 1);
   // Progress text
   const progressText = progressSlider.repeat(progress);
   const emptyProgressText = emptySlider.repeat(emptyProgress);
   // Create bar
   return `[${progressText+emptyProgressText}] : Page ${page + 1}`;
}