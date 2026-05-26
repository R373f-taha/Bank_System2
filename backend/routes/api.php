<?php
// api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountRequestController;
use Illuminate\Support\Facades\Route;

// ------------------- مسارات عامة (لا تحتاج تسجيل دخول) -------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
  Route::post('account/account-request', [AccountRequestController::class, 'create']);

// ------------------- مسارات محمية للمستخدمين العاديين -------------------
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // مسارات خاصة بتقديم الطلبات والتحقق منها للمستخدم العادي


});

  Route::post('verify-account', [AccountRequestController::class, 'verify']);
// ------------------- 🌟 مسارات لوحة تحكم الأدمن (Admin Dashboard) -------------------
// تم جمعها هنا وتأمينها بـ الـ Token والـ Role معاً بشكل مصفوفة آمنة ومحمية من الانهيار
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {

    // 1. جلب جميع طلبات الحسابات البنكية للأدمن
    Route::get('account/requests', [AccountRequestController::class, 'index']);

    // 2. قبول الطلب
    Route::post('account/{accountRequest}/accept', [AccountRequestController::class, 'acceptRequest']);

    // 3. رفض الطلب (تم إدخاله هنا لحمايته أيضاً)
    Route::post('account/{accountRequest}/reject', [AccountRequestController::class, 'reject']);

    // 4. جلب قائمة المستخدمين (إذا كنتِ تستعرضينهم في لوحة الأدمن)
    Route::get('/users', [UserController::class, 'index']);
});
