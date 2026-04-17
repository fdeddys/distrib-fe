import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div class="w-64 h-64 bg-slate-50 flex items-center justify-center rounded-full mb-8">
         <img src="https://illustrations.popsy.co/slate/work-from-home.svg" alt="Coming Soon" class="w-48 h-48">
      </div>
      <h1 class="text-3xl font-black text-slate-800 tracking-tight mb-3">Feature Under Construction</h1>
      <p class="text-slate-500 max-w-md leading-relaxed">
        Maaf, fitur ini sedang dalam tahap pengembangan oleh tim teknis kami. 
        Silakan kembali lagi nanti untuk update terbaru!
      </p>
      <button routerLink="/dashboard" class="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
        Kembali ke Dashboard
      </button>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ComingSoon {}
