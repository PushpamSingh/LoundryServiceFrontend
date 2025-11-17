import { create } from "zustand";

export const usePayment = create((set) => ({
  paymentpage: false,
  handlePaymentpage: () =>
    set((state) => ({
      paymentpage: !state.paymentpage
    }))
}));