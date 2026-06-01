<?php
// api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountRequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TransferController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
  Route::post('account/account-request', [AccountRequestController::class, 'create']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);



});

  Route::post('verify-account', [AccountRequestController::class, 'verify']);
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {

    Route::get('account/requests', [AccountRequestController::class, 'index']);


    Route::post('account/{accountRequest}/accept', [AccountRequestController::class, 'acceptRequest']);

    Route::post('account/{accountRequest}/reject', [AccountRequestController::class, 'reject']);

    Route::get('/users', [UserController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('notifications')->group(function () {
        Route::get('/all', [NotificationController::class, 'index']);
        Route::get('/count', [NotificationController::class, 'unreadCount']);
        Route::post('/mark-all-read', [NotificationController::class, 'markAllAsRead']);

       Route::middleware('check.notification.owner')->group(function () {
        Route::post('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);

       });
    });

});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/transfers', [TransferController::class, 'store']);
});
