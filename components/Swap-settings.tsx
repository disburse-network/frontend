"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface SwapSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slippage: string;
  onSlippageChange: (slippage: string) => void;
}

export function SwapSettings({
  open,
  onOpenChange,
  slippage,
  onSlippageChange,
}: SwapSettingsProps) {
  const [customSlippage, setCustomSlippage] = useState("");
  const [autoRouter, setAutoRouter] = useState(true);
  const [expertMode, setExpertMode] = useState(false);
  const [deadline, setDeadline] = useState("20");

  const presetSlippages = ["0.1", "0.5", "1.0"];

  const handleSlippageSelect = (value: string) => {
    onSlippageChange(value);
    setCustomSlippage("");
  };

  const handleCustomSlippage = (value: string) => {
    setCustomSlippage(value);
    onSlippageChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-2 border-cyber-orange bg-cyber-dark">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Transaction Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Slippage Tolerance */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-foreground">
                Slippage tolerance
              </Label>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="flex space-x-2">
              {presetSlippages.map((preset) => (
                <Button
                  key={preset}
                  variant={
                    slippage === preset && !customSlippage
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleSlippageSelect(preset)}
                  className="flex-1"
                >
                  {preset}%
                </Button>
              ))}
              <div className="flex-1 relative">
                <Input
                  type="number"
                  placeholder="Custom"
                  value={customSlippage}
                  onChange={(e) => handleCustomSlippage(e.target.value)}
                  className="text-center pr-6"
                  step="0.1"
                  min="0"
                  max="50"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            {Number.parseFloat(slippage) > 5 && (
              <div className="flex items-center space-x-2 p-2 bg-destructive border-2 border-destructive">
                <Info className="w-4 h-4 text-destructive-foreground" />
                <span className="text-sm text-destructive-foreground">
                  High slippage tolerance may result in unfavorable trades
                </span>
              </div>
            )}
          </div>

          {/* Transaction Deadline */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-foreground">
                Transaction deadline
              </Label>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-20"
                min="1"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>

          {/* Interface Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">
              Interface Settings
            </h3>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm text-foreground">
                  Auto Router API
                </Label>
                <p className="text-xs text-muted-foreground">
                  Use the best routing for optimal pricing
                </p>
              </div>
              <Switch checked={autoRouter} onCheckedChange={setAutoRouter} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm text-foreground">Expert Mode</Label>
                  <Badge
                    variant="destructive"
                    className="text-xs border-2 border-destructive"
                  >
                    Risky
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Allow high price impact trades and skip confirmation
                </p>
              </div>
              <Switch checked={expertMode} onCheckedChange={setExpertMode} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
