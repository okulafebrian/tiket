<?php

namespace Database\Seeders;

use App\Enums\DepartmentStatus;
use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bti = Department::create([
            'code' => 'BTI',
            'name' => 'Layanan Teknologi Informasi',
            'status' => DepartmentStatus::ACTIVE,
        ]);

        $bji = Department::create([
            'code' => 'BJI',
            'name' => 'Jaringan & Infrastruktur',
            'status' => DepartmentStatus::ACTIVE,
        ]);

        $bpa = Department::create([
            'code' => 'BPA',
            'name' => 'Pengembangan Sistem Aplikasi',
            'status' => DepartmentStatus::ACTIVE,
        ]);

        $bti->topics()->create([
            'name' => 'Laptop Rusak'
        ]);

        $bji->topics()->create([
            'name' => 'Penambahan CCTV'
        ]);

        $bpa->topics()->create([
            'name' => 'Aplikasi Baru'
        ]);
    }
}
