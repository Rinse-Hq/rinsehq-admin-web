"use client";

import { useCallback, useMemo, useState } from "react";
import type { Store, StoreAssignment } from "@/presentation/data/stores-data";
import {
  createAssignmentId,
  createStoreId,
  getAssignmentsForStore,
  getStoreRoleLabel,
} from "@/presentation/data/stores-data";
import { cn } from "@/presentation/lib/utils";
import {
  StoreAssignmentModal,
  type StoreAssignmentFormValues,
} from "@/presentation/components/account/store-assignment-modal";
import {
  StoreFormModal,
  type StoreFormValues,
} from "@/presentation/components/account/store-form-modal";

type StoreManagementSectionProps = {
  stores: Store[];
  assignments: StoreAssignment[];
  onSaveStores: (stores: Store[]) => void;
  onSaveAssignments: (assignments: StoreAssignment[]) => void;
};

export function StoreManagementSection({
  stores,
  assignments,
  onSaveStores,
  onSaveAssignments,
}: StoreManagementSectionProps) {
  const [query, setQuery] = useState("");
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [assignmentStore, setAssignmentStore] = useState<Store | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<StoreAssignment | null>(
    null,
  );

  const filteredStores = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stores;

    return stores.filter(
      (store) =>
        store.name.toLowerCase().includes(normalized) ||
        store.city.toLowerCase().includes(normalized) ||
        store.id.toLowerCase().includes(normalized),
    );
  }, [query, stores]);

  const openCreateStore = useCallback(() => {
    setEditingStore(null);
    setStoreModalOpen(true);
  }, []);

  const openEditStore = useCallback((store: Store) => {
    setEditingStore(store);
    setStoreModalOpen(true);
  }, []);

  const openAssignMember = useCallback((store: Store) => {
    setAssignmentStore(store);
    setEditingAssignment(null);
    setAssignmentModalOpen(true);
  }, []);

  const openEditAssignment = useCallback(
    (store: Store, assignment: StoreAssignment) => {
      setAssignmentStore(store);
      setEditingAssignment(assignment);
      setAssignmentModalOpen(true);
    },
    [],
  );

  const handleSaveStore = useCallback(
    (values: StoreFormValues) => {
      if (editingStore) {
        onSaveStores(
          stores.map((store) =>
            store.id === editingStore.id ? { ...store, ...values } : store,
          ),
        );
      } else {
        const ownerUserId = stores[0]?.ownerUserId ?? "demo-owner";
        const newStore: Store = {
          id: createStoreId(stores),
          ownerUserId,
          isMainStore: false,
          ...values,
        };
        onSaveStores([newStore, ...stores]);
      }
      setStoreModalOpen(false);
      setEditingStore(null);
    },
    [editingStore, onSaveStores, stores],
  );

  const handleSaveAssignment = useCallback(
    (values: StoreAssignmentFormValues) => {
      if (!assignmentStore) return;

      if (editingAssignment) {
        onSaveAssignments(
          assignments.map((assignment) =>
            assignment.id === editingAssignment.id
              ? {
                  ...assignment,
                  ...values,
                  storeId: assignmentStore.id,
                }
              : assignment,
          ),
        );
      } else {
        const newAssignment: StoreAssignment = {
          id: createAssignmentId(assignments),
          storeId: assignmentStore.id,
          ...values,
        };
        onSaveAssignments([...assignments, newAssignment]);
      }

      setAssignmentModalOpen(false);
      setAssignmentStore(null);
      setEditingAssignment(null);
    },
    [assignmentStore, assignments, editingAssignment, onSaveAssignments],
  );

  const handleRemoveAssignment = useCallback(
    (assignmentId: string) => {
      onSaveAssignments(assignments.filter((item) => item.id !== assignmentId));
    },
    [assignments, onSaveAssignments],
  );

  const handleRemoveStore = useCallback(
    (store: Store) => {
      if (store.isMainStore) {
        window.alert("The main store cannot be removed.");
        return;
      }
      const confirmed = window.confirm(`Remove "${store.name}"?`);
      if (!confirmed) return;
      onSaveStores(stores.filter((item) => item.id !== store.id));
      onSaveAssignments(assignments.filter((item) => item.storeId !== store.id));
    },
    [assignments, onSaveAssignments, onSaveStores, stores],
  );

  return (
    <>
      <article className="flat-card overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold text-slate-900">
                Store management
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage locations and assign managers or sub-admins to each store.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreateStore}
              className="flat-btn-primary h-10 w-auto shrink-0 px-5"
            >
              Add store
            </button>
          </div>

          <div className="mt-4">
            <input
              type="search"
              placeholder="Search stores"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:border-brand-400 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredStores.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">
              No stores found.
            </p>
          ) : (
            filteredStores.map((store) => {
              const storeAssignments = getAssignmentsForStore(store.id, assignments);

              return (
                <section key={store.id} className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-slate-900">{store.name}</h3>
                        {store.isMainStore ? (
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                            Main store
                          </span>
                        ) : null}
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            store.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600",
                          )}
                        >
                          {store.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {[store.address, store.city].filter(Boolean).join(", ") ||
                          "No address set"}
                      </p>
                      {store.phone ? (
                        <p className="mt-1 text-xs text-slate-400">{store.phone}</p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openAssignMember(store)}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Assign team
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditStore(store)}
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      {!store.isMainStore ? (
                        <button
                          type="button"
                          onClick={() => handleRemoveStore(store)}
                          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Assigned team
                    </p>
                    {storeAssignments.length === 0 ? (
                      <p className="mt-2 text-sm text-slate-400">
                        No managers or sub-admins assigned yet.
                      </p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {storeAssignments.map((assignment) => (
                          <li
                            key={assignment.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-100 bg-slate-50/50 px-3 py-2"
                          >
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {assignment.name}
                              </p>
                              <p className="text-xs text-slate-500">{assignment.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">
                                {getStoreRoleLabel(assignment.role)}
                              </span>
                              <button
                                type="button"
                                onClick={() => openEditAssignment(store, assignment)}
                                className="text-xs font-medium text-brand-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveAssignment(assignment.id)}
                                className="text-xs text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </article>

      <StoreFormModal
        open={storeModalOpen}
        store={editingStore}
        onClose={() => {
          setStoreModalOpen(false);
          setEditingStore(null);
        }}
        onSave={handleSaveStore}
      />

      <StoreAssignmentModal
        open={assignmentModalOpen}
        store={assignmentStore}
        assignment={editingAssignment}
        onClose={() => {
          setAssignmentModalOpen(false);
          setAssignmentStore(null);
          setEditingAssignment(null);
        }}
        onSave={handleSaveAssignment}
      />
    </>
  );
}
