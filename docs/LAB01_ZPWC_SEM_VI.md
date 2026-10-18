# LAB 1 — Zaawansowane programowanie w chmurze (semestr VI, 3 h)

**Temat karty:** Usługi chmurowe (AWS, Azure, GCP), modelowanie architektury
w chmurze.

To osobna grupa; nie zakładamy zrealizowania LAB 1 z semestru IV.

## Zadania
1. Otwórz starter i wykonaj audyt zależności aplikacji.
2. Wyjaśnij, czym różnią się IaaS, PaaS, SaaS oraz usługa bazy zarządzanej;
   wskaż przykładowe analogie w AWS/Azure/GCP.
3. Wykonaj `komis.sql` i `verify.sql` w Neon.
4. Zaimplementuj test połączenia w `src/check-db.js`, używając `.env`
   i JSDoc; nie publikuj sekretu.
5. Narysuj diagram: lokalny Node.js → sieć/TLS → Neon PostgreSQL,
   uwzględniając dane, konfigurację i punkt awarii.
6. Uzasadnij granicę odpowiedzialności zespół/dostawca. Rozważ błąd
   danych, błędny sekret i niedostępność połączenia.
7. Zaproponuj sposób odseparowania STAGE/PROD (do implementacji w późniejszym
   etapie). Zapisz, jakie dowody byłyby potrzebne do porównania z inną platformą.

## Dowód
- działające dane PostgreSQL i SELECT z klienta;
- diagram architektury;
- opis trzech decyzji i ich konsekwencji.

Dziś bez Cloudflare, VPS, Azure deploymentu i pełnego CI/CD.

[⚠ WYMAGA WERYFIKACJI PROWADZĄCEGO]
