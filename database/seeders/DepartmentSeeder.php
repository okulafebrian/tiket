<?php

namespace Database\Seeders;

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
        ]);

        $bji = Department::create([
            'code' => 'BJI',
            'name' => 'Jaringan & Infrastruktur',
        ]);

        $bpa = Department::create([
            'code' => 'BPA',
            'name' => 'Pengembangan Sistem Aplikasi',
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
