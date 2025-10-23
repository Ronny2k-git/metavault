# TanStack Start + Prisma: Server Functions and React Query

In the **tantack start framework** **it's neither necessary nor possible to create a route.ts inside SRC/API** just create a folder inside src only by **organization** called: server, for example:

## 1. Create data on the database

Route example: (src/server/createTestOnDb.ts)

```ts
export const createTestOnDb = createServerFn({
method: 'POST',
})
.inputValidator()
.handler() => {
return prisma.vault.create({
data: {
ALL TABLE DATA HERE...
},
})
}
```

## 2. Fetch data from the database

Route example: (src/server/getAllTestsCreated.ts)

```ts
export const getAllTestCreated = createServerFn().handler(async () => {
try {
const test = await prisma.test.findMany({
select: {
TABLE FIELDS HERE...
},
})

return test

} catch (error) {
console.error(error)
throw new Error('Failed to fetching test')
}
})
```

### To call these tanstack server functions on the client, use useMutation or useQuery for example:

## 1.1 Create (client)

```ts
export function useCreateTestOnDb() {
  const query = useQueryClient()

  return useMutation({
    mutationFn: createTestOnDb,
    onSuccess: () => query.invalidateQueries({ queryKey: ['get-test'] }),
  })
}
```

## 2.2 Get (client)

```ts
export function useGetAllTestsCreated() {
  return useQuery({
    queryKey: ['get-test'],
    queryFn: getAllTestsCreated,
  })
}
```
