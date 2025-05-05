import * as yup from "yup";
import {
  FormField,
  sharedSchema,
  initialValues,
  sharedFormElements,
} from "../constants";

export const publicationValues = {
  ...initialValues,
  message: "",
  pubType: "EBook",
  useCustomerAddress: true,
  // Delivery address fields
  deliveryStreet: "",
  deliveryCity: "",
  deliveryState: "",
  deliveryPostalCode: "",
  deliveryCountry: "",
};

export const publicationSchema = sharedSchema.concat(
  yup.object().shape({
    message: yup.string(),
    pubType: yup.string().required("Publication type is required"),
    useCustomerAddress: yup.boolean(),
    // Delivery address fields - conditionally required based on pubType and useCustomerAddress
    deliveryStreet: yup.string().when(["pubType", "useCustomerAddress"], {
      is: (pubType: string, useCustomerAddress: boolean) =>
        pubType === "Print" && !useCustomerAddress,
      then: () =>
        yup.string().required("Street address is required for delivery"),
      otherwise: () => yup.string(),
    }),
    deliveryCity: yup.string().when(["pubType", "useCustomerAddress"], {
      is: (pubType: string, useCustomerAddress: boolean) =>
        pubType === "Print" && !useCustomerAddress,
      then: () => yup.string().required("City is required for delivery"),
      otherwise: () => yup.string(),
    }),
    deliveryState: yup.string().when(["pubType", "useCustomerAddress"], {
      is: (pubType: string, useCustomerAddress: boolean) =>
        pubType === "Print" && !useCustomerAddress,
      then: () => yup.string().required("State is required for delivery"),
      otherwise: () => yup.string(),
    }),
    deliveryPostalCode: yup.string().when(["pubType", "useCustomerAddress"], {
      is: (pubType: string, useCustomerAddress: boolean) =>
        pubType === "Print" && !useCustomerAddress,
      then: () => yup.string().required("Postal code is required for delivery"),
      otherwise: () => yup.string(),
    }),
    deliveryCountry: yup.string().when(["pubType", "useCustomerAddress"], {
      is: (pubType: string, useCustomerAddress: boolean) =>
        pubType === "Print" && !useCustomerAddress,
      then: () => yup.string().required("Country is required for delivery"),
      otherwise: () => yup.string(),
    }),
  })
);

export const publicationFormElement: Array<FormField> = [
  ...sharedFormElements,
  {
    htmlFor: "pubType",
    label: "Publication Type",
    choices: [
      { label: "Electronic Book (ebook)", value: "EBook" },
      { label: "Printed Book", value: "Print" },
    ],
  },
];
