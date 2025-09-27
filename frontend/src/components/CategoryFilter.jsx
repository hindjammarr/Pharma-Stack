import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";
import { useState } from "react";

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearAll
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Catégories
          {selectedCategories.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {selectedCategories.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);

            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "ghost"}
                className="w-full justify-between h-auto p-3"
                onClick={() => {
                  console.log(`Toggling category: ${category.name}`);
                  onCategoryToggle(category.id);
                }}
                data-testid={`button-category-${category.id}`}
              >
                <span className="text-left">{category.name}</span>
                {category.count !== undefined && (
                  <Badge variant={isSelected ? "secondary" : "outline"}>
                    {category.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {selectedCategories.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={() => {
              console.log("Clearing all filters");
              onClearAll();
            }}
            data-testid="button-clear-filters"
          >
            <X className="h-4 w-4 mr-2" />
            Effacer les filtres
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
