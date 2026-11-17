import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BRAND_ASSETS } from '../data/landingData';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

interface StoredRegistration {
  id: string;
  unitId: string;
  unitCode: string;
  unidade: string;
  nomeCompleto: string;
  email: string;
  celularWhatsapp: string;
  destinationWhatsapp: string;
  routingStatus: string;
  routingStatusLabel: string;
  submittedDate: string;
  submittedTime: string;
  origin: string;
  createdAt?: Timestamp | null;
}

export function AdminVouchersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [registrations, setRegistrations] = useState<StoredRegistration[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady || !user) {
      setRegistrations([]);
      return;
    }

    const q = query(
      collection(db, 'voucher_registrations'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setErrorMessage(null);
        const rows = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<StoredRegistration, 'id'>),
        }));
        setRegistrations(rows);
      },
      (error) => {
        setErrorMessage(
          'Acesso restrito a administradores verificados do banco de dados.'
        );
        try {
          handleFirestoreError(
            error,
            OperationType.LIST,
            'voucher_registrations'
          );
        } catch {
          // Handled in UI state
        }
      }
    );

    return () => unsubscribe();
  }, [authReady, user]);

  const handleSignIn = async () => {
    setErrorMessage(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Falha ao autenticar.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#111111] p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10">
          <div className="flex items-center gap-3">
            <img
              src={BRAND_ASSETS.logoOfficial}
              alt="Óticas Filipe"
              className="h-9 w-auto"
            />
            <div>
              <h1 className="text-xl font-extrabold">
                Painel Administrativo — Vouchers
              </h1>
              <p className="text-xs text-[#71717A]">
                Registros persistidos em Firestore (voucher_registrations)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-4 py-2 rounded-full border border-black/20 text-xs font-bold hover:bg-black/5"
            >
              Voltar ao site
            </a>
            {user ? (
              <button
                type="button"
                onClick={() => void signOut(auth)}
                className="px-4 py-2 rounded-full bg-[#111111] text-[#F5B800] text-xs font-bold cursor-pointer"
              >
                Sair ({user.email})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void handleSignIn()}
                className="px-4 py-2 rounded-full bg-[#F5B800] text-[#111111] text-xs font-extrabold cursor-pointer"
              >
                Entrar com Google
              </button>
            )}
          </div>
        </header>

        {errorMessage && (
          <div className="mt-4 rounded-xl border border-[#ef4444] bg-[#fef2f2] p-4 text-sm text-[#7f1d1d]">
            {errorMessage}
          </div>
        )}

        {!authReady ? (
          <p className="mt-8 text-sm text-[#71717A]">Verificando sessão...</p>
        ) : !user ? (
          <div className="mt-8 rounded-2xl bg-white border border-black/10 p-8 text-center">
            <p className="text-sm text-[#3F3F46]">
              Faça login com a conta administrativa autorizada para visualizar
              os cadastros de voucher.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white border border-black/10">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#111111] text-[#F5B800]">
                  <th className="p-3 font-bold">Data / Hora</th>
                  <th className="p-3 font-bold">Unidade</th>
                  <th className="p-3 font-bold">Cliente</th>
                  <th className="p-3 font-bold">WhatsApp</th>
                  <th className="p-3 font-bold">E-mail</th>
                  <th className="p-3 font-bold">Destino</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-[#71717A]">
                      Nenhum cadastro de voucher registrado até o momento.
                    </td>
                  </tr>
                ) : (
                  registrations.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-black/10 hover:bg-[#FEF9E7]/40"
                    >
                      <td className="p-3 whitespace-nowrap tabular-nums">
                        {row.submittedDate} {row.submittedTime}
                      </td>
                      <td className="p-3 font-semibold">{row.unidade}</td>
                      <td className="p-3">{row.nomeCompleto}</td>
                      <td className="p-3 tabular-nums">{row.celularWhatsapp}</td>
                      <td className="p-3">{row.email}</td>
                      <td className="p-3 tabular-nums">
                        {row.destinationWhatsapp || '—'}
                      </td>
                      <td className="p-3 font-bold">
                        {row.routingStatusLabel}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
