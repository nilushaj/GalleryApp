export default {
    baseURL: 'https://picsum.photos/v2/',
    getImages: function (limit) {
        return this.baseURL + 'list?limit=' + limit;
    },
    reloadImages: function (limit) {
        return this.baseURL + 'llist?page=2&limit=' + limit;
    }
};

