"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Bookmark,
  ShoppingBag,
  Menu,
  Filter,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";

const outfits = [
  {
    id: 1,
    name: "Casual Chic",
    items: ["White T-shirt", "Blue Jeans", "Sneakers"],
    occasion: "casual",
    style: "modern",
  },
  {
    id: 2,
    name: "Office Ready",
    items: ["Dress Shirt", "Pant", "Loafers"],
    occasion: "work",
    style: "classic",
  },
  {
    id: 3,
    name: "Pyjamas",
    items: ["Night outfit", "Blue"],
    occasion: "evening",
    style: "glamorous",
  },
  {
    id: 4,
    name: "Weekend Brunch",
    items: ["Plain shirt", "Shorts"],
    occasion: "casual",
    style: "bohemian",
  },
  {
    id: 5,
    name: "Athleisure",
    items: ["Yoga Pants", "Hoodie", "Running Shoes"],
    occasion: "sport",
    style: "sporty",
  },
  {
    id: 6,
    name: "Fall outfit",
    items: ["Jeans", "Sweater", "Shoes"],
    occasion: "casual",
    style: "beachy",
  },
  {
    id: 7,
    name: "Formal Gala",
    items: ["Tuxedo", "Bow Tie", "Dress Shoes"],
    occasion: "formal",
    style: "elegant",
  },
  {
    id: 8,
    name: "Business Casual",
    items: ["Polo Shirt", "Chinos", "Loafers"],
    occasion: "work",
    style: "smart",
  },
];

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [stylePreference, setStylePreference] = useState(50);
  const [filteredOutfits, setFilteredOutfits] = useState(outfits);

  const filterOutfits = () => {
    const filtered = outfits.filter((outfit) => {
      if (activeTab !== "all" && outfit.occasion !== activeTab) return false;
      const styleMatch = stylePreference < 50 ? "classic" : "modern";
      return outfit.style === styleMatch;
    });
    setFilteredOutfits(filtered);
  };

  const refreshRecommendations = () => {
    // In a real application, this would fetch new recommendations from the server
    // For now, we'll just shuffle the existing outfits
    setFilteredOutfits([...filteredOutfits].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Your Style Recommendations
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="casual">Casual</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="evening">Evening</TabsTrigger>
              <TabsTrigger value="sport">Sport</TabsTrigger>
              <TabsTrigger value="formal">Formal</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={refreshRecommendations} className="ml-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Style Preference</h2>
          <div className="flex items-center space-x-4">
            <span>Classic</span>
            <Slider
              value={[stylePreference]}
              onValueChange={(value) => setStylePreference(value[0])}
              max={100}
              step={1}
              className="flex-grow"
            />
            <span>Modern</span>
          </div>
        </div>

        <Button onClick={filterOutfits} className="mb-6">
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>

        <OutfitGrid outfits={filteredOutfits} />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Trending Items
          </h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {[1, 2, 3, 4].map((item) => (
                <TrendingItemCard key={item} itemId={item} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Style Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mixing Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Learn how to confidently mix patterns for a bold, stylish
                  look.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accessorizing 101</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Discover the art of accessorizing to elevate any outfit.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Personalized Style Analysis
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Your Style Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Based on your preferences and past choices, we&apos;ve analyzed
                your style:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Preferred Colors: Blue, Gray, White</li>
                <li>Favorite Brands: Brand A, Brand B, Brand C</li>
                <li>
                  Style Persona: Modern Minimalist with a Touch of Bohemian
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button>Update Style Profile</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}

function OutfitGrid({ outfits }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {outfits.map((outfit) => (
        <OutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </div>
  );
}

function OutfitCard({ outfit }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{outfit.name}</CardTitle>
        <CardDescription>
          AI-curated outfit for {outfit.occasion}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md mb-4 relative overflow-hidden">
          <Image
            src={`/images/outfit_${outfit.id}.jpg`}
            alt={outfit.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <ul className="list-disc list-inside">
          {outfit.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Heart className="h-4 w-4 mr-2" />
          Like
        </Button>
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

function TrendingItemCard({ itemId }) {
  return (
    <Card className="w-[300px]">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-t-md relative overflow-hidden">
          <Image
            src={`/images/product_${itemId}.jpg`}
            alt={`Trending Item ${itemId}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-1">Trending Item {itemId}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            $99.99
          </p>
          <Button size="sm" className="w-full">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
