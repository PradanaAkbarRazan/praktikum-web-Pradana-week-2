const tasks = [
	{ title: "Rancang wireframe aplikasi", course: "Interaksi Manusia & Komputer", due: "Hari ini" },
	{ title: "Rangkuman bab basis data", course: "Sistem Basis Data", due: "Besok" },
	{ title: "Latihan soal struktur data", course: "Struktur Data", due: "Jumat" },
];

const schedule = [
	{ time: "08.00", course: "Pemrograman Web", room: "Lab Komputer 2" },
	{ time: "10.30", course: "Sistem Basis Data", room: "Ruang 3.12" },
	{ time: "13.00", course: "Struktur Data", room: "Ruang 2.08" },
];

export default function Beranda() {
	return (
		<>
			<a
				href="#konten"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:p-3 focus:text-brand focus:ring-2 focus:ring-brand"
			>
				Lewati ke konten utama
			</a>

			<header className="border-b border-line bg-white">
				<nav
					aria-label="Navigasi utama"
					className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
				>
					<a href="#beranda" className="text-lg font-bold text-brand">
						RuangKuliah
					</a>
					<ul className="flex flex-col gap-2 text-sm text-ink sm:flex-row sm:items-center sm:gap-6">
						<li><a className="rounded-sm hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#beranda">Beranda</a></li>
						<li><a className="rounded-sm hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#tugas">Tugas</a></li>
						<li><a className="rounded-sm hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#jadwal">Jadwal</a></li>
						<li><a className="rounded-sm hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#kontak">Kontak</a></li>
					</ul>
					<span className="text-sm text-muted">Pradana · Semester 4</span>
				</nav>
			</header>

			<main id="konten" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
				<section id="beranda" aria-labelledby="judul-utama" className="flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center sm:py-10">
					<div>
						<p className="mb-2 text-xs font-semibold uppercase text-muted">Dashboard mahasiswa</p>
						<h1 id="judul-utama" className="text-3xl font-bold text-ink">Halo, Pradana!</h1>
						<p className="mt-2 text-base text-muted">Ini ringkasan kegiatan kuliahmu minggu ini.</p>
					</div>
					<div className="grid grid-cols-[auto_auto] items-center gap-x-3 gap-y-1 rounded-md border border-line bg-white px-4 py-3" aria-label="Minggu ke-7, 14 sampai 20 Oktober">
						<span className="col-span-2 text-xs font-semibold text-muted">MINGGU</span>
						<strong className="text-2xl text-brand">07</strong>
						<span className="text-xs text-muted">14—20 OKT</span>
					</div>
				</section>

				<section aria-label="Ringkasan minggu ini" className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
					<article className="flex items-center justify-between rounded-md border border-line bg-white p-5">
						<h2 className="text-sm font-semibold text-muted">Tugas aktif</h2>
						<p className="text-3xl font-bold text-brand">3</p>
					</article>
					<article className="flex items-center justify-between rounded-md border border-line bg-white p-5">
						<h2 className="text-sm font-semibold text-muted">Selesai</h2>
						<p className="text-3xl font-bold text-brand">1</p>
					</article>
					<article className="flex items-center justify-between rounded-md border border-line bg-white p-5">
						<h2 className="text-sm font-semibold text-muted">Kelas hari ini</h2>
						<p className="text-3xl font-bold text-brand">3</p>
					</article>
				</section>

				<div className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-[2fr_1fr]">
					<section id="tugas" aria-labelledby="judul-tugas" className="rounded-md border border-line bg-white p-5">
						<h2 id="judul-tugas" className="mb-4 text-xl font-semibold text-ink">Daftar tugas</h2>
						<ul>
							{tasks.map((task) => (
								<li key={task.title} className="flex flex-col gap-2 border-t border-line py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
									<div className="grid gap-1">
										<strong className="text-sm text-ink">{task.title}</strong>
										<span className="text-sm text-muted">{task.course}</span>
									</div>
									<time className="shrink-0 text-sm text-muted">{task.due}</time>
								</li>
							))}
						</ul>
					</section>

					<section id="jadwal" aria-labelledby="judul-jadwal" className="rounded-md border border-line bg-white p-5">
						<h2 id="judul-jadwal" className="mb-4 text-xl font-semibold text-ink">Jadwal hari ini</h2>
						<ul>
							{schedule.map((item) => (
								<li key={item.time} className="flex items-center gap-4 border-t border-line py-4">
									<time className="w-12 shrink-0 text-sm text-muted">{item.time}</time>
									<div className="grid gap-1">
										<strong className="text-sm text-ink">{item.course}</strong>
										<span className="text-sm text-muted">{item.room}</span>
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>

				<section id="kontak" aria-labelledby="judul-kontak" className="mb-10 rounded-md border border-line bg-white p-5 sm:p-6">
					<h2 id="judul-kontak" className="text-xl font-semibold text-ink">Hubungi kami</h2>
					<p className="mt-2 max-w-2xl text-sm text-muted">Punya pertanyaan tentang jadwal atau tugas? Kirim pesan melalui formulir ini.</p>
					<form action="#kontak" method="get" className="mt-5 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="flex flex-col gap-1">
							<label htmlFor="nama" className="text-sm font-medium text-ink">Nama lengkap</label>
							<input id="nama" name="nama" type="text" autoComplete="name" required className="rounded-md border border-line bg-white px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" />
						</div>
						<div className="flex flex-col gap-1">
							<label htmlFor="email" className="text-sm font-medium text-ink">Alamat email</label>
							<input id="email" name="email" type="email" autoComplete="email" aria-describedby="email-bantuan" required className="rounded-md border border-line bg-white px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" />
							<p id="email-bantuan" className="text-sm text-muted">Gunakan alamat email yang masih aktif.</p>
						</div>
						<fieldset className="flex flex-col gap-2 sm:col-span-2">
							<legend className="mb-1 text-sm font-medium text-ink">Saya menghubungi sebagai</legend>
							<label className="flex items-center gap-2 text-sm text-ink">
								<input type="radio" name="peran" value="mahasiswa" required className="accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" />
								Mahasiswa
							</label>
							<label className="flex items-center gap-2 text-sm text-ink">
								<input type="radio" name="peran" value="dosen" className="accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" />
								Dosen
							</label>
						</fieldset>
						<div className="flex flex-col gap-1 sm:col-span-2">
							<label htmlFor="pesan" className="text-sm font-medium text-ink">Pesan</label>
							<textarea id="pesan" name="pesan" rows={4} required className="rounded-md border border-line bg-white px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" />
						</div>
						<button type="submit" className="w-fit rounded-md bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:col-span-2">
							Kirim pesan
						</button>
					</form>
				</section>
			</main>

			<footer className="border-t border-line bg-white">
				<p className="mx-auto max-w-6xl px-4 py-5 text-sm text-muted sm:px-6">© 2026 RuangKuliah · Dibuat untuk mahasiswa</p>
			</footer>
		</>
	);
}
