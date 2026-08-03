# TanStack Start + Prisma: Server Functions and React Query

In **TanStack Start**, it's neither necessary nor possible to create a `route.ts` inside `src/api`. TanStack Start uses an internal fetch mechanism to make calls, so manually creating routes (like `src/api/createVaultOnDb`) isn't needed.

Instead, just create a function with `createServerFn` and call it on the client using `useServerFn`, `useMutation`, `useQuery`, or similar. The `server` folder inside `src` is purely for **organization** — it's not a framework requirement.

---

## 1. Create data on the database

**File:** `src/server/createTestOnDb.ts`

```ts
export const createTestOnDb = createServerFn({
  method: 'POST',
})
  .inputValidator()
  .handler(async () => {
    return prisma.vault.create({
      data: {
        // ALL TABLE DATA HERE...
      },
    })
  })
```

---

## 2. Fetch data from the database

**File:** `src/server/getAllTestsCreated.ts`

```ts
export const getAllTestCreated = createServerFn().handler(async () => {
  try {
    const test = await prisma.test.findMany({
      select: {
        // TABLE FIELDS HERE...
      },
    })

    return test
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch test')
  }
})
```

---

## Calling server functions on the client

Use `useMutation` or `useQuery` to call these server functions.

### 1.1 Create (client)

```ts
export function useCreateTestOnDb() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: createTestOnDb,
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-test'] }),
  })
}
```

### 2.1 Get (client)

```ts
export function useGetAllTestsCreated() {
  return useQuery({
    queryKey: ['get-test'],
    queryFn: getAllTestsCreated,
  })
}
```

---

> 💡 **Key difference from Next.js:** no manual API routes, no `route.ts` files — server functions are just regular TypeScript functions decorated with `createServerFn`, callable directly from client hooks.
