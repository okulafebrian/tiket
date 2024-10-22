<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Location::create([
            'name' => 'SMAK 1 PENABUR'
        ]);

        Location::create([
            'name' => 'SMAK 2 PENABUR'
        ]);

        Location::create([
            'name' => 'SMAK 3 PENABUR'
        ]);
    }
}
