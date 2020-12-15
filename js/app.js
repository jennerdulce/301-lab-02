'use strict';

let listOfPictures1 = [];
let listOfPictures2 = [];
let keywords = [];
let currentPage = 0;

function Pictures(url, title, description, keyword, horns, pictureSet) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  pictureSet.push(this);
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
}

// Sorts Alphabetically
const sortByTitle = arr => {
  arr.sort((a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1; // move to the left
    } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1; // move to the right
    } else {
      return 0; // do nothing
    }
  });
  return arr;
};

// Sorts By Horns Property
const sortByHorns = arr => {
  // JS Automatically knows which letter comes before the other.
  return arr.sort((a, b) => a.horns > b.horns ? 1 : -1); //true:false
};


//DONE: Use AJAX, specifically $.ajax(), to read the provided JSON file.
//DONE: Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.

$.ajax('./data/page-1.json')
  .then(data => {
    data.forEach(value => {
      new Pictures(value.image_url, value.title, value.description, value.keyword, value.horns, listOfPictures1);
    });
    renderImages(listOfPictures1, 'page1');

  });

$.ajax('./data/page-2.json')
  .then(data => {
    data.forEach(value => {
      new Pictures(value.image_url, value.title, value.description, value.keyword, value.horns, listOfPictures2);
    });
    renderImages(listOfPictures2, 'page2');
    renderKeywords();
  });

//DONE: Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.

// How images are made and put on the DOM
function renderImages(arr, page) {
  arr.forEach(function (value) {

    // MUSTACHE -----
    let $imageTemplate = $('#image-template').html();
    let $rendered = Mustache.render($imageTemplate, {
      class: `${value.keyword} horns${value.horns} ${page}`,
      title: value.title,
      image: value.url,
      description: value.description
    });
    $('#container').append($rendered);
  });
}

function renderKeywords() {
  keywords.forEach(value => {

    let $keywordTemplate = $('#keyword-template').html();
    let $rendered = Mustache.render($keywordTemplate, {
      keywordValue: value,
      text: value
    });
    $('#keyword').append($rendered);
  });
}

function checkCurrentPage() {
  if (currentPage === 1) {
    $('.page2').hide();
  } else if (currentPage === 2) {
    $('.page1').hide();
  } else if (currentPage === 0) {
    $('.page2').show();
    $('.page1').show();
  }
}

// Hide/show when clicking on a category
$('#keyword').on('change', function () {
  let $category = $(this).val();

  if ($category === 'home') {
    $('section').show();

  } else {
    // Hides ALL images
    $('section').hide();

    // Shows images with the class chosen
    $(`.${$category}`).show();
  }

  if (currentPage === 1) {
    $('.page2').hide();
  } else if (currentPage === 2) {
    $('.page1').hide();
  }
});

// When clicking pages
$('button').on('click', function () {
  // Each button has a different ID value; Set this value to $page
  let $page = $(this).attr('id');

  // if the ID = 'page1'
  if ($page === 'page1') {
    // Useful when we SORT alphabetically or by horns
    currentPage = 1;
    console.log('Current page is now, ' + currentPage);
    // Hides everything and only shows elements with the class of .page1
    $('section').hide();
    $('.page1').show();

    // if the ID = 'page2'
  } else if ($page === 'page2') {
    // Useful when we SORT alphabetically or by horns
    currentPage = 2;
    console.log('Current page is now, ' + currentPage);
    // Hides everything and only shows elements with the class of .page2
    $('section').hide();
    $('.page2').show();

  } else {
    currentPage = 0;
    $('section').show();
  }
});

// CURRENT PAGE IS 1
// Event handler
$('#sort').on('change', function () {
  let value = $(this).val();
  $('#container').empty(); // dump everything

  if (value === 'alphabetical') {
    // Rerender
    renderImages(sortByTitle(listOfPictures1), 'page1');
    renderImages(sortByTitle(listOfPictures2), 'page2');

  } else if (value === 'horns') {
    // Rerender
    renderImages(sortByHorns(listOfPictures1), 'page1');
    renderImages(sortByHorns(listOfPictures2), 'page2');

  } else {
    renderImages(listOfPictures1, 'page1');
    renderImages(listOfPictures2, 'page2');
  }
  checkCurrentPage();
});

// terneries if statement

// very beginning all images are rendered both 1 and 2