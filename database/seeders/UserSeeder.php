<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'department_id' => 1,
            'name' => 'Admin',
            'email' => 'admin@bpkpenaburjakarta.or.id',
            'password' => Hash::make('abc123')
        ])->assignRole('admin');

        User::create([
            'department_id' => 1,
            'name' => 'Agent',
            'email' => 'agent@bpkpenaburjakarta.or.id',
            'password' => Hash::make('abc123')
        ])->assignRole('admin');
    }
}
