export interface Categories{
    key :string 
    title  :string 
    imageUrl:string 
    href:string
}


// newsCategories.ts
export const newsCategories:Categories[] = [
    {
      key: "general",
      title: "General",
      imageUrl: "https://images.pexels.com/photos/2464435/pexels-photo-2464435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  ",
      href: "/general"
    },
    {
      key: "technology",
      title: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      href: "/technology"
    },
    {
      key: "business",
      title: "Business",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      href: "/business"
    },
    {
      key: "sports",
      title: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      href: "/sports"
    },
    {
      key: "entertainment",
      title: "Entertainment",
      imageUrl: "https://images.pexels.com/photos/1306791/pexels-photo-1306791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      href: "/entertainment"
    },
    {
      key: "health",
      title: "Health",
      imageUrl: "https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      href: "/health"
    },
    {
      key: "science",
      title: "Science",
      imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      href: "/science"
    }
  ];