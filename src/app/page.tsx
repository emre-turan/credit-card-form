import { CreditCardForm } from "@/components/credit-card-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[1000px] bg-zinc-900 rounded-[2.5rem] p-8 sm:p-12 shadow-xl">
        <div className="max-w-xl mx-auto">
          <div className="mb-24 space-y-2 text-center">
            <h1 className="text-2xl font-medium text-zinc-200">
              Payment Details
            </h1>
            <p className="text-zinc-400 text-sm">
              Please enter your card information to complete the payment
            </p>
          </div>
          <CreditCardForm />
        </div>
      </div>
    </div>
  );
}
