# Bukti Dokumen — Pencapaian / Achievements

Letakkan sertifikat, surat undangan, foto kegiatan, atau dokumen liputan media di folder ini.

## Konvensi Penamaan

Format: `TAHUN-deskripsi-pendek.pdf`

## Contoh

```
2018-speaker-upi-bandung.pdf
2018-international-naresuan-unpad.pdf
2018-interview-ntu-singapore.pdf
2015-ugm-best-social-activist.pdf
```

## Cara Pasang Link

1. Letakkan PDF di sini
2. Buka `data/achievements.json`
3. Ganti `"proof_url": null` jadi `"proof_url": "proofs/achievements/NAMA-FILE.pdf"`

## Tips

- Kalau ada beberapa bukti untuk 1 achievement (misal: sertifikat + foto + undangan), gabungkan jadi 1 PDF multi-page.
- Atau, alternatif: pakai link folder Google Drive: `"proof_url": "https://drive.google.com/drive/folders/XXXXX"`
