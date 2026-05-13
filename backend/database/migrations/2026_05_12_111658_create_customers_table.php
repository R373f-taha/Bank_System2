<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->unique();
            $table->string('phone', 20)->nullable();
            $table->text('address')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('account_type', ['savings', 'checking'])->default('savings');
            $table->decimal('account_balance', 15, 2)->default(0.00);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
