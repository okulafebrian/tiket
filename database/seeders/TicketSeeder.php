<?php

namespace Database\Seeders;

use App\Enums\TicketCategory;
use App\Models\Ticket;
use App\Models\Topic;
use App\Services\TicketService;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 300; $i++) {
            $topic = Topic::with('department')->find(rand(1, 3));
            $department = $topic->department;
            $categories = array_column(TicketCategory::cases(), 'value');

            Ticket::create([
                'location_id' => rand(1, 3),
                'topic_id' => $topic->id,
                'category' => shuffle($categories),
                'department_id' => $department->id,
                'user' => 'admin@bpkpenaburjakarta.or.id',
                'reference_number' => $this->ticketService->getReferenceNumber($department),
                'description' => $faker->text(),
            ]);
        }
    }
}
