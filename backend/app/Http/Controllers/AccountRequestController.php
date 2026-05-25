<?php

namespace App\Http\Controllers;

use App\Models\AccountRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\AccountRequestService;
use App\Http\Requests\AccounRequest\AccountRequestFormRequest;
class AccountRequestController extends Controller
{

    public function __construct(
        private AccountRequestService $service
    ) {}
    /**
     * [CUSTOMER] Create account request with all data
     * POST /api/account-request
     */
    public function create(AccountRequestFormRequest $request): JsonResponse
    {
        $accountRequest = $this->service->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => [
                'unique_link' => $accountRequest->unique_link,
                'full_url' => config('app.url') . '/verify/' . $accountRequest->unique_link,
            ],
        ], 201);
    }
}