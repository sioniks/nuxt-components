import Vue from 'vue';

Vue.filter('componentValidName', (value) => {
  if (!value) return '';
  if (value.indexOf('_')) {
    let newString = '';
    const arr = value.split('_');
    arr.forEach((item) => {
      newString += item.charAt(0).toUpperCase() + item.slice(1);
    });
    return newString;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('priceFormat', function (value) {
  return value.toLocaleString();
});
