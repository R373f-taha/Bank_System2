<?php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all(['id', 'name', 'email']);
        return response()->json($users);
    }
    public function getLatestTransactions()
{
    $user = Auth::user();

    $transactions = Transaction::where('customer_id', $user->id)
        ->with(['transfer.sender', 'transfer.receiver']) 
        ->latest()
        ->take(6)
        ->get();

    return response()->json([
        'success' => true,
        'message' => 'تم جلب آخر 6 عمليات بنجاح مع تفاصيلها.',
        'data' => $transactions
    ], 200);
}
}
