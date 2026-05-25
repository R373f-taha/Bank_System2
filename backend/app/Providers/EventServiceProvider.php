<?php

namespace App\Providers;

use App\Events\AccountRequestAcceptedEvent;
use App\Events\ArticlePublished;
use App\Listeners\SendAccountRequestAcceptedEmail;
use App\Listeners\SendArticlePublishedNotification;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{

  protected $listen = [
    AccountRequestAcceptedEvent::class => [
        SendAccountRequestAcceptedEmail::class,
    ],
];
    /**
     * Register services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        parent::boot();
    }
}
