<template>
    <section class="card invoice-page" id="app">
        <div id="invoice-template" class="card-body">

            <!-- Invoice Recipient Details -->
            <div id="invoice-customer-details" class="row pt-2">
                <div class="col-sm-6 col-12 ">
                    <h5>Supplier</h5>
                    <div v-if="selectedSupplier == null" class="">
                        <input @keyup="getSupplier()" v-model="supplierSearch" type="text" class="form-control">
                        <ul v-if="dropdownShow" class="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                            <li v-for="_supplier in suppliers"><a @click="selectSupplier(_supplier)"
                                                                  class="dropdown-item">{{ _supplier.name }}</a></li>
                            <li v-if="suppliers.length == 0" class="dropdown-item text-center text-danger">no supplier
                                found
                            <li/>
                        </ul>
                    </div>
                    <div v-else class="supplier">
                        <h5>{{ selectedSupplier.name }}</h5>
                        <h6>{{ selectedSupplier.phone }}</h6>
                        <span>{{ selectedSupplier.address }}</span>
                    </div>
                </div>
                <div class="col-sm-6 col-12 ">
                    <h5>Branch</h5>
                    <div class="company-info my-2">

                    </div>
                </div>
            </div>
            <!--/ Invoice Recipient Details -->


            <!-- Invoice Items Details -->
            <div id="invoice-items-details" class="pt-1 invoice-items-table">
                <div class="row">
                    <div class="table-responsive col-12">
                        <table class="table ">
                            <thead>
                            <tr>
                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>AMOUNT</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="selectedProduct in selectedProducts">
                                <td>{{ selectedProduct.title }}</td>
                                <td><input type="number" v-model="selectedProduct.quantity"></td>
                                <td>{{ selectedProduct.price }}</td>
                                <td>{{ selectedProduct.subTotal = selectedProduct.quantity * selectedProduct.price }}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="invoice-total-details" class="invoice-total-table">
                <div class="row">
                    <div class="col-7 offset-5">
                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <th>SUBTOTAL</th>
                                    <td> TK {{ total }}</td>
                                </tr>
                                <tr>
                                    <th>DISCOUNT (5%)</th>
                                    <td>{{ total*0.05 }}</td>
                                </tr>
                                <tr>
                                    <th>TOTAL</th>
                                    <td>TK {{ total - (total*0.05)}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-25">
                <h5>Product</h5>
                <input @keyup="getProduct()" v-model="productSearch" type="text" class="form-control">
                <ul class="dropdown-menu show" aria-labelledby="dropdownMenuButton4">
                    <li v-for="product in products"><a @click="addToCart(product)"
                                                       class="dropdown-item">{{ product.title }}</a></li>
                    <li v-if="products.length == 0" class="dropdown-item text-center text-danger">no products found
                    <li/>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Supplier",
    data() {
        return {
            dropdownShow: false,
            suppliers: [],
            supplierSearch: '',
            selectedSupplier: null,
            productSearch: '',
            productDropdown: false,
            products: [],
            selectedProducts: []

        }
    },
    methods: {
        getSupplier() {
            if (this.supplierSearch != "") {
                axios.get(`http://127.0.0.1:8000/admin/get-supplier?name=${this.supplierSearch}`)
                    .then(res => {
                        this.suppliers = res.data;
                        this.dropdownShow = true;
                    })
            }
        },
        getProduct() {
            if (this.productSearch != "") {
                axios.get(`http://127.0.0.1:8000/admin/get-product?name=${this.productSearch}`)
                    .then(res => {
                        let products = res.data;
                        products.forEach(product => {
                            let newProduct = product;
                            newProduct.quantity = 1;
                            newProduct.subTotal = 0;
                            this.products.push(newProduct)
                        })
                        this.productDropdown = true
                    })
            }
        },
        selectSupplier(supplier) {
            this.selectedSupplier = supplier;
            this.supplierSearch = supplier.name;
            this.dropdownShow = false
        },
        addToCart(product) {
            let matchedProduct = this.selectedProducts.filter((sproduct) => sproduct.id === product.id);
            if (matchedProduct.length === 0) {
                this.selectedProducts.push(product);
            } else {
                matchedProduct[0].quantity++;
            }

        }
    },
    computed: {
        total: function () {
            let total = 0;
            this.selectedProducts.forEach(function (product) {
                total += product.subTotal
            })
            return total.toFixed(2)
        }
    },
}
</script>

<style scoped>

</style>
