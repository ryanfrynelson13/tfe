import axios from "axios";
import { BasketType } from "../../types/basket/basket.type";
import { Sale } from "../../types/sales/sale.type";
import { SALES_URLS } from "../../enums/sales-urls.enum";
import { getToken } from "../../utils/token.util";

export const createSale =async (basket: BasketType) => {

    let body: BasketType = {
        ...basket,
        products: basket.products.filter(products => products.checkOut), 
        checkOutTotal: basket.checkOutTotal /100
    }
    const token = getToken()
    const {data} = await axios.post<Sale>(SALES_URLS.sales, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}