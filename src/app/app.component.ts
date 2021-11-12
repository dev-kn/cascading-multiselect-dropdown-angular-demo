import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  dropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'Select All',
    itemsShowLimit: 100,
    allowSearchFilter: true
  };

  categoryDataList: Array<any> = [
    { name: 'Books', subcategory: [
        {name: 'eBooks', products: ['Prod eBook 1', 'Prod eBook 2', 'Prod eBook 3']},
        {name: 'Music', products: ['Prod Music 1', 'Prod Music 2', 'Prod Music 3']},
        {name: 'Novel', products: ['Prod Novel 1', 'Prod Novel 2']}
      ]
    },
    { name: 'Electronics', subcategory: [
        {name: 'Phones', products: ['Prod Phone 1', 'Prod Phone 2', 'Prod Phone 3']},
        {name: 'Tabs', products: ['Prod Tab 1','Prod Tab 2', 'Prod Tab 3', 'Prod Tab 4']},
        {name: 'Cameras', products: ['Prod Camera 1']},
        {name: 'TVs', products: ['Prod TV 1', 'Prod TV 2']}
      ]
    },
    { name: 'Houseware', subcategory: [
        {name: 'Tableware', products: ['Prod Tableware 1', 'Prod Tableware 2']},
        {name: 'Kitchenware', products: ['Prod Kitchenware 1']}
      ]
    }
  ];

  subcategoryDataList: Array<any> = [];
  displayingCategoryList: Array<any> = [];
  selectedCategoryList: Array<any> = [];
  displayingSubcategoryList: Array<any> = [];
  selectedSubcategoryList: Array<any> = [];
  displayingProductList: Array<any> = [];
  selectedProductList: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.displayingCategoryList = ['Books', 'Electronics', 'Houseware'];
    this.updateSubcategoryLists();
  }

  onCategoryItemSelect(): void {
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onSubcategoryItemSelect(): void {
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onProductItemSelect(): void {
    this.updateProductLists();
  }
  onCategorySelectAll(items: any): void {
    this.selectedCategoryList = items;
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onSubcategorySelectAll(items: any): void {
    this.selectedSubcategoryList = items;
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onProductSelectAll(items: any): void {
    this.selectedProductList = items;
    this.updateProductLists();
  }
  onCategoryItemDeSelect(item: any): void {
    this.removeSubcategoryFromSelectedSubcategoryList(item);
    this.updateSubcategoryLists();
  }
  onSubcategoryItemDeSelect(item: any): void {
    this.removeProductFromSelectedProductList(item);
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onProductItemDeSelect(item: any): void {
    // console.log(item);
  }
  onCategoryDeSelectAll(): void {
    this.selectedCategoryList = [];
    this.selectedSubcategoryList = [];
    this.selectedProductList = [];
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onSubcategoryDeSelectAll(): void {
    this.selectedSubcategoryList = [];
    this.selectedProductList = [];
    this.updateSubcategoryLists();
    this.updateProductLists();
  }
  onProductDeSelectAll(): void {
    this.selectedProductList = [];
    this.updateProductLists();
  }

  updateSubcategoryLists(): void{
    this.subcategoryDataList = [];
    this.selectedCategoryList.forEach( (selectedCat) => {
      this.subcategoryDataList.push(...this.categoryDataList.find((cat: any) => cat.name === selectedCat ).subcategory);
    });
    this.displayingSubcategoryList = this.subcategoryDataList.map((val) => val.name);
  }

  updateProductLists(): void{
    this.displayingProductList = [];
    this.selectedSubcategoryList.forEach( (selectedSubcategory) => {
      this.displayingProductList.push(...this.subcategoryDataList.find((sub: any) => sub.name === selectedSubcategory ).products);
    });
  }

  removeSubcategoryFromSelectedSubcategoryList(unSelectedCategory: any): void{
    const removingSubcategoryList: any = [];
    removingSubcategoryList.push(...this.categoryDataList.find((cat: any) => cat.name === unSelectedCategory ).subcategory);
    removingSubcategoryList.forEach((val: any) => {
      this.selectedSubcategoryList = this.selectedSubcategoryList.filter((sub: any) => sub !== val.name);
      this.removeProductFromSelectedProductList(val.name);
    });
  }

  removeProductFromSelectedProductList(unSelectedSubcategory: any): void{
    const removingProductList: any = [];
    removingProductList.push(...this.subcategoryDataList.find((cat: any) => cat.name === unSelectedSubcategory ).products);
    removingProductList.forEach((val: any) => {
      this.selectedProductList = this.selectedProductList.filter((prod: any) => prod !== val);
    });
  }

}
