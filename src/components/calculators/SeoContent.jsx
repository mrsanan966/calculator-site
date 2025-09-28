
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SeoContent = ({ title, children }) => {
  const processChildren = (nodes) => {
    return React.Children.map(nodes, child => {
      if (typeof child === 'string') {
        return child;
      }
      if (React.isValidElement(child) && child.props && child.props.children) {
        const newProps = { ...child.props, children: processChildren(child.props.children) };
        if (child.type === 'a' && child.props.href && child.props.href.startsWith('/')) {
          return <Link to={child.props.href} {...newProps} className={child.props.className || "text-primary hover:underline"}>{newProps.children}</Link>;
        }
        return React.cloneElement(child, newProps);
      }
      return child;
    });
  };

  return (
    <Card className="mt-8 bg-muted/30 border-dashed">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <BookOpen className="mr-3 h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground prose dark:prose-invert max-w-none">
        <Separator className="mb-4" />
        {processChildren(children)}
      </CardContent>
    </Card>
  );
};

export default SeoContent;
  