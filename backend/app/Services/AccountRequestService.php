<?php

namespace App\Services;

use App\Models\AccountRequest;

class AccountRequestService
{
    /**
     * Create a new account request
     */
    public function create(array $data): AccountRequest
    {
        return AccountRequest::create([
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'date_of_birth' => $data['date_of_birth'],
            'gender' => $data['gender'],
            'marital_status' => $data['marital_status'],
            'identity_number' => $data['identity_number'],
            'address' => $data['address'],
            'occupation' => $data['occupation'],
            'deposit_amount' => $data['deposit_amount'],
            'status' => AccountRequest::STATUS_PENDING,
        ]);
    }
}