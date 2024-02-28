import { Controller, useForm } from "react-hook-form"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import { useCreateSales } from "./useCreateSales";
import { useUpdateSales } from "./useUpdateSales";
import { getInventoryData, getInventoryDetails, getMedicationDetails, updateInventoryQuantity } from "../../services/apiSales";
import { formatCurrency } from "../../utils/helpers";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";


const CreateNewSales = ({ onCloseModal, saleToUpdate = {} }) => {
  const { id: saleId, ...updateValues } = saleToUpdate;
  const isUpdateSession = Boolean(saleId);

  const { register, handleSubmit, reset, formState, control, setValue, watch } = useForm({
    defaultValues: isUpdateSession ? updateValues : { price: "", medName: "", quantity: "", costPrice: "" },
  });

  const [isLoadingPrices, setIsLoadingPrices] = useState(false)
  const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);


  const { errors } = formState;
  const { isCreating, createSale } = useCreateSales();
  const { isUpdating, updateSale } = useUpdateSales();
  // const { inventory } = useInventory();


  const { isLoading, data: inventory, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: getInventoryData,
  })

  if(isLoadingPrices || isLoadingQuantity || isLoading) return <Spinner />


  const isWorking = isCreating || isUpdating;

  const checkInventoryAvailability = async (medicationsWithQuantities) => {
    try {
      for (const medicationWithQuantity of medicationsWithQuantities) {
        const [medName, medQuantity] = medicationWithQuantity.split(':').map(item => item.trim());
        const inventoryRawData = await getInventoryDetails(medName);
        const inventoryData = inventoryRawData[0]

        // console.log(inventoryData)

        // console.log("Inventory units:", inventoryData[0].units);
        // console.log("Parsed medQuantity:", parseInt(medQuantity));
        if (!inventoryData) {
          toast.error(`Inventory details not found for medication: ${medName}`);
          return false;
        }
  
        if (inventoryData.units < parseInt(medQuantity)) {
          toast.error(`Requested quantity (${medQuantity}) not available in inventory for medication: ${medName}`);
          return false;
        }
  
        if (parseInt(medQuantity) === 0) {
          toast.error(`Quantity cannot be 0 for medication: ${medName}`);
          return false;
        }
      }
  
      return true;
    } catch (error) {
      console.error("Error checking inventory availability:", error);
      toast.error("Error checking inventory availability. Please try again.");
      return false;
    }
  };
  
  

const handleSubmitSale = async (data) => {
  console.log('saleData', data)
  try {
    const dataArray = Object.entries(data).reduce((acc, [key, value]) => {
      if (key !== 'clientName' && key !== 'totalPrice' && key !== 'totalCost') {
        if (typeof value === 'string' && value.includes('\n')) {
          const splitValues = value.split('\n').map(entry => entry.trim());
          acc[key] = splitValues;
        } else {
          acc[key] = [value];
        }
      } else {
        acc[key] = value; 
      }
      return acc;
    }, {});

    // const { medName, quantity } = dataArray

    // console.log('medName', medName)
    // console.log('quantity', quantity)

    // console.log('dataArray', dataArray)

    if (!Array.isArray(dataArray.medName)) {
      console.error("Medication names are not in the expected format.");
      return;
    }

    const medicationsWithQuantities = dataArray.quantity.map((name, index) => {
      const data = name.split(':');
      const quantity = data[1].trim();
      console.log(data[0].trim(), quantity)
      return `${data[0].trim()}: ${quantity}`;
    });
    

    console.log('medicationsWithQuantities', medicationsWithQuantities)
    

    console.log(medicationsWithQuantities);

    const isAvailable = await checkInventoryAvailability(medicationsWithQuantities);

    console.log('isAvailable', isAvailable)
    if (!isAvailable) {
      toast.error("Requested quantity not available in inventory.");
      onCloseModal();
      return false;
    }
    const cleanDataArray = {};

    for (const key in dataArray) {
      if (Array.isArray(dataArray[key])) {
        cleanDataArray[key] = dataArray[key].map(item => item.replace(/[[\]']/g, '')).join('\n');
      } else {
        cleanDataArray[key] = dataArray[key];
      }
  }

  console.log('cleanDataArray', cleanDataArray);

    if (isUpdateSession) {
      updateSale(
        { newSaleData: { ...cleanDataArray }, id: saleId },
        {
          onSuccess: () => {
            // reset();
            // onCloseModal?.();
          },
        }
      );
    } else {
      createSale(
        { ...cleanDataArray },
        {
          onSuccess: () => {
            // reset();
            // onCloseModal?.();
          },
        }
      );
    }

    const loadingToastId = toast.loading('Please wait, your request is being processed...');


    // Deduct quantities from inventory
    // for (let i = 0; i < dataArray.medName.length; i++) {
    //   await deductFromInventory({ medName: dataArray.medName[i], quantity: dataArray.quantity[i] });
    // }
    
    // Deduct quantities from inventory
    const medNameArray = dataArray.medName;
    const quantityArray = dataArray.quantity;

    if (medNameArray.length !== quantityArray.length) {
      console.error("Medication names and quantities array lengths do not match.");
      return;
    }

for (let i = 0; i < medNameArray.length; i++) {
  const medName = medNameArray[i];
  const quantity = quantityArray[i];

  await deductFromInventory({ medName, quantity });
}

    
    toast.dismiss(loadingToastId);
    reset();
    onCloseModal?.();
  } catch (error) {
    console.error("Error processing sale:", error);
  }
};



//{ name: ['ibucap', 'vitamin c'], price: [200, 300]}

const deductFromInventory = async (data) => {
  try {
    const { medName, quantity } = data;

    console.log('invmedName', medName)
    console.log('invquantity', quantity)

    // Iterate through medName and quantity arrays
    for (let i = 0; i < medName.length; i++) {
      const currentMedName = medName;
      const currentQuantity = quantity;

      console.log('currentMedName', currentMedName)
      console.log('currentQuantity', currentQuantity)

      // Extract medication name and quantity
      const [medicationName, qty] = currentQuantity.split(':').map(item => item.trim());

      console.log('medicationName', medicationName)
      console.log('qty', qty)

      // Find the inventory entry for the current medication
      const inventoryData = inventory.map(data => data.medication_name)
      console.log('inventoryData', inventoryData)

      const inventoryEntry = inventory.find(entry => entry.medication_name.trim().toLowerCase() === medicationName.toLowerCase());
      console.log('inventoryEntry', inventoryEntry)

      if (!inventoryEntry) {
        throw new Error(`Inventory details not found for medication: ${medicationName}`);
      }

      // Deduct quantity from the inventory
      const remainingUnits = inventoryEntry.units - parseInt(qty);

      if (remainingUnits < 0) {
        throw new Error(`Requested quantity (${qty}) not available in inventory for medication: ${medicationName}`);
      }

      // Update the inventory quantity
      await updateInventoryQuantity(medicationName, remainingUnits);
    }

    console.log('Quantities deducted from inventory successfully.');
  } catch (error) {
    console.error("Error deducting from inventory:", error);
  }
};


const handleFetchPrice = async (medNames) => {
  setIsLoadingPrices(true); // Set loading state to true while fetching prices

  try {
    const costPrices = [];
    const prices = [];
    const quantity = [];
    const dosage = [];
    const batchNo = [];

    for (const medName of medNames) {
      try {
        const [cost, unit] = await Promise.all([getMedicationDetails(medName), getMedicationDetails(medName)]);
        const unitPrice = unit.unitPrice;
        const costPrice = cost.costPrice;

        costPrices.push({ medName, costPrice: formatCurrency(costPrice) });
        prices.push({ medName, price: formatCurrency(unitPrice) });
        quantity.push({ medName });
        dosage.push({ medName });
        batchNo.push({ medName });
      } catch (error) {
        toast.error(`Error fetching price for ${medName}: ${error.message}. Please double check your medication name and internet connection.`);
        costPrices.push({ medName, price: 'N/A' }); 
        prices.push({ medName, price: 'N/A' }); 
      }
    }
  
    const formattedPrices = prices.map((item) => `${item.medName}: ${item.price}`).join('\n');
    const formattedCostPrices = costPrices.map((item) => `${item.medName}: ${item.costPrice}`).join('\n');
    console.log('formattedPrices', formattedPrices)
    const formattedQuantity = quantity.map((item) => `${item.medName}: `).join('\n');
    const formattedDosage = dosage.map((item) => `${item.medName}: `).join('\n');
    const formattedBatchNo = batchNo.map((item) => `${item.medName}: `).join('\n');

    console.log("Before replacement:", formattedBatchNo);
    const formattedBatchNoCleaned = formattedBatchNo.replace(/[[\]"]/g, '');
    console.log("After replacement:", formattedBatchNoCleaned);

    
    setValue('price', formattedPrices);
    setValue('costPrice', formattedCostPrices)
    setValue('quantity', formattedQuantity)
    setValue('dosage', formattedDosage)
    setValue('batchNo', formattedBatchNo)

  } catch (error) {
    console.error('Error fetching prices:', error);
  } finally {
    setIsLoadingPrices(false); // Set loading state to false after fetching prices
  }
};


  const handleReset = () => {
    reset();
    onCloseModal()
  }
  

  const handleError = (errors) => {
    console.log(errors);
  };

  const handleMedNameBlur = (e) => {
    const medNames = e.target.value.split('\n').map((name) => name.trim());
    handleFetchPrice(medNames);
  };

  const quantity = watch('quantity')
  const price = watch('price')
  const costPrice = watch('costPrice')

  const handleQuantityBlur = () => {
    setIsLoadingQuantity(true); 
  
    console.log('TEST');
    console.log('Quantity:', quantity, 'Price:', price);
  
    if (price && costPrice && quantity) { 
      const splitArrayPrice = price.split('\n');
      const splitArrayCostPrice = costPrice.split('\n');
      const splitArrayQuantity = quantity.split('\n');
  
      let totalPrice = 0;
      let totalCostPrice = 0;
  
      for (let i = 0; i < splitArrayPrice.length && splitArrayCostPrice; i++) {
        const splitPrice = splitArrayPrice[i].split(': $');
        const splitCostPrice = splitArrayCostPrice[i].split(': $')
        const splitQuantity = splitArrayQuantity[i].split(':');
  
        const priceString = splitPrice[1].replace(/,/g, '');
        const costPriceString = splitCostPrice[1].replace(/,/g, '');
  
        const priceValue = parseFloat(priceString);
        const costPriceValue = parseFloat(costPriceString);
        const quantityValue = parseFloat(splitQuantity[1]);
  
        console.log('priceValue', priceValue)
  
        if (!isNaN(priceValue) && !isNaN(quantityValue) && !isNaN(costPriceValue)) {
          totalPrice += priceValue * quantityValue;
          totalCostPrice += costPriceValue * quantityValue;
        }
      }
  
      setValue('totalPrice', totalPrice);
      setValue('totalCost', totalCostPrice);
    }
  
    setIsLoadingQuantity(false);
  };
  
  console.log('errors', errors)

  return (
    <form onSubmit={handleSubmit(handleSubmitSale, handleError)} className="p-2 min-w-[300px]">
      <FormRow label="Med. name" error={errors?.name?.message}>
        <Controller
          name="medName"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="medName"
              className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3"
              disabled={isWorking}
              onBlur={handleMedNameBlur}
            />
          )}
        />
      </FormRow>
      <FormRow label="Client name" error={errors?.clientName?.message}>
        <input type="text" id="clientName" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3" disabled={isWorking} {...register("clientName", { required: "This field is required" })} />
      </FormRow>
      <div className="flex gap-3">
        <FormRow label="Batch No." error={errors?.batchNo?.message}>
          <textarea type="text" id="batchNo" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled={isWorking} {...register("batchNo", { required: "This field is required" })} />
        </FormRow>
        <FormRow label="Quantity" error={errors?.quantity?.message}>
          <Controller 
            name="quantity"
            control={control}
            render={({ field }) => (
            <textarea
              {...field} 
              id="quantity" 
              className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-full"
              disabled={isWorking}

              {...register("quantity", { required: "This field is required" })} 
              onBlur={handleQuantityBlur}
            />
          )}
          />
        </FormRow>

      </div>
      <div className="flex gap-3">
        <FormRow label="Cost Price" error={errors?.costPrice?.message}>
          <textarea id="costPrice" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled {...register("costPrice", { required: "This field is required" })} />
        </FormRow>
        <FormRow label="Price" error={errors?.price?.message}>
          <textarea id="price" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled {...register("price", { required: "This field is required" })} />
        </FormRow>
        <FormRow label="Time" error={errors?.time?.message}>
          <input type="datetime-local" id="time" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled={isWorking} {...register("dateAndTime", { required: "This field is required" })} />
        </FormRow>
      </div>
      <div className="flex gap-3">
        <FormRow label="Dosage" error={errors?.dosage?.message}>
          <textarea type="text" id="dosage" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled={isWorking} {...register("dosage", { required: "This field is required" })} />
        </FormRow>
        <FormRow label="Cost Total" error={errors?.totalCost?.message}>
          <input type="number" id="totalCostPrice" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled {...register("totalCost", { required: "This field is required", min: { value: 1, message: "Total Cost must be at least 1" } })} />
        </FormRow>
        <FormRow label="Total Price" error={errors?.totalPrice?.message}>
          <input type="number" id="totalPrice" className="border-solid border border-black ml-2 rounded-sm px-2 py-1 mb-3 w-[100%]" disabled {...register("totalPrice", { required: "This field is required", min: { value: 1, message: "Total Price must be at least 1" } })} />
        </FormRow>
      </div>
      <div className="self-end">
        <FormRow>
          <div className="flex justify-between">
          <button type="button" className="p-2 rounded-md mb-3 text-gray-600 inline-block cursor:pointer bg-gray-400 dark:text-gray-900" onClick={handleReset} disabled={isWorking}>
          Cancel
        </button>
            <Button disabled={isWorking} type="primary">
              {isUpdateSession ? "Edit Sale" : "Add Sale"}
            </Button>
          </div>
        </FormRow>
      </div>
    </form>
  );
};

export default CreateNewSales;

