import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getSaleInvoice } from "../../services/apiSales";
import { useParams } from "react-router-dom";

export function useSaleInvoice() {
    const { salesId } = useParams()

    const { isLoading: isLoadingInvoice, data: invoice } = useQuery({
        queryKey: ['sales', salesId],
        queryFn: () => getSaleInvoice(salesId),
      })
      console.log('jjjj', invoice)
    return { invoice, isLoadingInvoice }
   
}
