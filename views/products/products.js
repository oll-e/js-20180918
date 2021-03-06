import { Products } from '../../blocks/products/products';
import { ProductCard } from '../../blocks/product-card/product-card';
import { View } from '../view';
import _ from './products.scss';
import template from './products.pug';
import {Search} from "../../blocks/search/search";

export class ProductsView extends View{

  constructor(el) {
    super(el);
    this.render();
    
    // TODO: improve that
    this.products = [
        {
            id: 1,
            title: "Short Product Name",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mauris libero et posuere scelerisque tempor malesuada, a congue suspendisse integer habitasse in fringilla sagittis pretium cubilia nibh cras. Turpis tristique mauris augue dictumst ad a taciti, ultrices dapibus facilisi quis pretium tempus fermentum ut, nisi aliquet sagittis vestibulum facilisis et. Justo mi ut nunc ante euismod mollis fringilla scelerisque lectus, congue pulvinar turpis sociis inceptos eros est phasellus neque, nostra tellus ac auctor vehicula magna vitae curae.\n" +
                "\n" +
                "Feugiat sapien tristique tempor augue faucibus purus mollis id cursus hac, orci dis blandit accumsan neque etiam porta lacinia ultrices, conubia in suspendisse ullamcorper dictumst commodo habitant felis libero. Potenti a magna duis primis mattis molestie maecenas urna nullam, placerat et sociosqu turpis rhoncus gravida ligula viverra, enim risus tempor integer nascetur felis habitasse semper. Eu commodo est nisl posuere tempus nulla elementum, quis morbi egestas mauris eget pellentesque, aliquam suspendisse iaculis fusce sociis suscipit.",
            price: 1000,
            currency: "р",
            imageSrc: "https://via.placeholder.com/800x600.png?text=Product Image"
        },
        {
            id: 2,
            title: "Short Product Name 2",
            description: "А это не такое длинное описание товара 2",
            price: 2000,
            currency: "р",
            imageSrc: "https://via.placeholder.com/800x600.png?text=Product2 Image"
        },
        {
            id: 3,
            title: "Short Product Name 3",
            description: "Совсем короткое описание товара 3",
            price: 3000,
            currency: "р",
            imageSrc: "https://via.placeholder.com/800x600.png?text=Product3 Image"
        },
        {
            id: 4,
            title: "Фонарик",
            description: "Фонарик и в Африке фонарик",
            price: 200,
            currency: "р",
            imageSrc: "https://via.placeholder.com/800x600.png?text=Product4 Image"
        }
    ];
    
    this.currentProduct = this.products[0];

    this.search = new Search({
        el: document.querySelector('.js-search')
    });
    
    this.productsBlock = new Products({
      el: document.querySelector('.js-products')
    });

    this.card = new ProductCard({
      el: document.querySelector('.js-product-card'),
        options: {
          
        }
    });

    this.productsBlock.render({items: this.products});
    this.productsBlock.onItemClick = (id) => {
        console.log(`Product id=${id} clicked`);
        this.currentProduct = this.products.find(product => product.id === +id);
        this.card.render(this.currentProduct);
    };

    this.card.render(this.currentProduct);
    this.card.onPurchaseButtonClick = () => {
        console.log('purchase button clicked');
        parent.location.hash = `orders?productId=${this.currentProduct.id}`
    };
    
    this.search.render({});
    const that = this;
    this.search.onSearch = (query ) => {
        console.log(`search for ${query}`);
        const upperQuery = query.toLocaleUpperCase();
        that.productsBlock.render({items: that.products.filter(product => product.title.toLocaleUpperCase().indexOf(upperQuery) !== -1)});
    }
  }

  render() {
    this.el.innerHTML = template();
  }
}

// export class Product {
//     constructor() {
//         this.id = 0;
//         this.title = "";
//         this.description = "";
//         this.price = 0;
//         this.currency = "";
//         this.imageSrc = "";
//     }
// }