import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form!: FormGroup

  constructor(private productService: ProductsService,
    public modalService: ModalService
  ) { }



  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }


  submit() {
    this.productService.create({
      title: this.form.value.title,
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 41,
        count: 4
      }
    }).subscribe(
      () => this.modalService.close()
    )
  }

}
