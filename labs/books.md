# Books

The mock API has an endpoint at `/api/books`. It supports a `GET` request.

We want to create a component that lists out the data from the results of the HTTP call to this endpoint.

## Steps

### 1. Create a Feature

In `/src/app` create a feature folder called `books` with a `books.component.ts` and a `books.routes.ts`

Create the component and create the routes as in the Counter lab.

Add a link to the nav bar for the books.

_extra credit - hide the link and protect the route using a feature flag called `books`_

### 2. "ProtoType" - Getting the data

Inject the `HttpClient` directly into the `books.component`. We are going to "prototype" to get a sense of the data first.
Later we will refactor to a service (store).

Create a field in the component class to hold the books returned from the `HttpClient` when the request is made.

We want to have this be a signal, but the `HttpClient`'s methods return Observables.

The `@angular/core/rxjs-interop` package has a method called `toSignal` that can convert an observable into a signal. Natanel Basal, of NgNeat Fame, has a good [Medium](https://netbasal.com/converting-observables-to-signals-in-angular-what-you-need-to-know-4f5474c765a0) that goes into some details.

The body of your component class might look something like this:

```typescript
#client = inject(HttpClient);
books = toSignal(this.#client.get("/api/books"));
```

In the template, display the raw books response as json in a `<pre>` tag so you can get a sense of the data.

We are going to want to display each book's `id`, `author`, `title` and `year`.

In the client's get request, create an anonymous type that describes the data you are expecting and interesting in, making sure you only return the books.

*We are practicing Postel's Law here - "Be conservative with what you produce, be liberal with what you accept" - create a type that *only* has the information we are interested it. For us, we need the id, title, author and year from each book.*

Your code might look something like this:

```typescript
books = toSignal(
  this.#client
    .get<{
      data: { id: string; title: string; author: string; year: number }[];
    }>("/api/books")
    .pipe(map((res) => res.data)),
);
```

Convert the `<pre>` element to an unordered list, and for each of the books in the books signal, display a list item element with the raw jason for the book.

```typescript
    <ul>
      @for(book of books(); track book.id) {
      <li>
        <pre>{{ book | json }}</pre>
      </li>
      }
    </ul>
```

You will notice that while our type seems to specify only certain data (id, title, author, etc.) all of the data is displayed.

In TypeScript, the types are for "us" and don't have anything to do with "reality" in the browser. They are just a way for the compiler to do some "checking" for us as we code, and give us some code completion.

Now, let's convert the raw data displayed into an HTML table that displays the id, title, author, and year.

Choose something that works for you from [DaisyUi](https://daisyui.com/components/table/) and use that.

### 3. "ProtoType" Expanded (A little more advanced)

After the table of books, we want another table that lists out a summary of the books by century and how many books in the data set are from that century.

So something like this:

| Century | Number Of Books |
| ------- | --------------- |
| 1300s   | 3               |
| 1400s   | 0               |
| 1500s   | 8               |

etc. (these numbers are just made up.)

You will probably need to use a `computed()` signal to do this.

Extra Credit: It might be cool to use the Timeline component from DaisyUi to display this data.

### 3.1 "Prototype" Expanded - Extract Child Components

Create two new components - one for the book list component, one for the century summary.

Create required signal inputs for each of them, and have the books component pass them the data book list signal.

_Extra Credit_: Create an _alternate_ component to visualize the books by century using the [Timeline Component](https://daisyui.com/components/timeline/) from DaisyUi. See which one you like better. Time box this, though - it's an experiment.

### 4 "Prototype" Moving to "More Real"

Create a new service and move the Http call to the component as a method.

Have the method return the observable, and in the component class, remove the injected HttpClient, and instead inject and use your new service class. Use the `toSignal` on the result of that call.

### 5. State Management - Moving to a Store

This is going to get more advanced. And less guidance.

> We want to limit the number of books shown in the list. The API we are calling does not provide pagination or limiting in any way, but we need that.

Create a `BooksStore` (like our BankStore or or the CounterStore stores) that will store our books.

Hints:

You will probably with to use `withEntities`, look at the BankStore store for inspiration.

### 5.1 State Management - Pagination

#### Prefs - Page Size

In the component that lists your books, create a component that allows the user to select how many books they want to see at a time. Consider five, ten, twenty-five, or all. The default will be ten.

When they choose, the list updates accordingly.

#### Pagination

Based on their page size, create an affordance that lets them move back and forth through the pages. (Something like [DaisyUi Pagination](https://daisyui.com/components/pagination/))

When it is "good enough", extract both the template and functionality for the page size functionality and the pagination functionality to new components.

#### Filtering

Add a new component that allows the user to type in a filter string that filters the list based on the title and author. Limit the results displayed to that.
