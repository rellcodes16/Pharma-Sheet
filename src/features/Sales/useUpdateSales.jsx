// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { updateSales as updateSalesApi } from "../../services/apiSales";

// export function useUpdateSales(){
//   const queryClient = useQueryClient();

//   const { mutate: updateSale, isLoading: isUpdating } = useMutation({
//     mutationFn: ({ newSaleData, id }) => updateSalesApi(newSaleData, id),
//     onSuccess: () => {
//       toast.success('Sale Item Successfully Updated');
//       queryClient.invalidateQueries({ queryKey: ['sales']});
//     },
//     onError: (err) => toast.error(err.message)
//   })

//   return { isUpdating, updateSale }
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSales as updateSalesApi } from "../../services/apiSales";

export function useUpdateSales() {
  const queryClient = useQueryClient();

  const { mutate: updateSale, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newSaleData, id }) => updateSalesApi(newSaleData, id),
    onSuccess: async ({ updateSaleData, updateHistoryData }) => {
      if (updateSaleData && updateHistoryData) {
        // Both sales and history data are updated successfully
        toast.success('Sale Item Successfully Updated');
        // Invalidate sales and history queries to trigger refetch
        queryClient.invalidateQueries('sales');
        queryClient.invalidateQueries('history');
      } else {
        // Handle error if either sales or history data update fails
        toast.error('Failed to update sale item');
      }
    },
    onError: (err) => toast.error(err.message)
  });

  return { isUpdating, updateSale };
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { updateSalesAndHistory } from "../../services/apiSales"; // Assuming you've implemented transaction handling in this function

// export function useUpdateSales() {
//   const queryClient = useQueryClient();

//   const { mutate: updateSale, isLoading: isUpdating } = useMutation({
//     mutationFn: ({ newSaleData, id }) => updateSalesAndHistory(newSaleData, id), // Using the function with transaction handling
//     onSuccess: () => {
//       toast.success('Sale Item Successfully Updated');
//       queryClient.invalidateQueries({ queryKey: ['sales'] });
//       queryClient.invalidateQueries({ queryKey: ['history'] }); // Also invalidate history queries
//     },
//     onError: (err) => toast.error(err.message)
//   });

//   return { isUpdating, updateSale };
// }
