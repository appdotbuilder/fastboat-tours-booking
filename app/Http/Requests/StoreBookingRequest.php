<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'quantity' => 'required|integer|min:1|max:10',
            'booking_date' => 'required|date|after:today',
            'bookable_type' => 'required|in:App\Models\FastboatTicket,App\Models\TourPackage',
            'bookable_id' => 'required|integer|exists_with_type',
            'payment_method' => 'required|in:credit_card,bank_transfer,pay_at_office',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'customer_name.required' => 'Full name is required.',
            'customer_email.required' => 'Email address is required.',
            'customer_email.email' => 'Please provide a valid email address.',
            'customer_phone.required' => 'Phone number is required.',
            'quantity.required' => 'Number of tickets/participants is required.',
            'quantity.min' => 'Minimum 1 ticket/participant is required.',
            'quantity.max' => 'Maximum 10 tickets/participants allowed per booking.',
            'booking_date.required' => 'Booking date is required.',
            'booking_date.after' => 'Booking date must be in the future.',
            'payment_method.required' => 'Payment method is required.',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->addImplicitExtension('exists_with_type', function ($attribute, $value, $parameters, $validator) {
            $data = $validator->getData();
            $type = $data['bookable_type'] ?? null;
            
            if ($type === 'App\Models\FastboatTicket') {
                return \App\Models\FastboatTicket::where('id', $value)->where('is_active', true)->exists();
            } elseif ($type === 'App\Models\TourPackage') {
                return \App\Models\TourPackage::where('id', $value)->where('is_active', true)->exists();
            }
            
            return false;
        });
    }
}