import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, RotateCcw, Flag, QrCode, Plus, Trash2, Save, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

/**
 * FRONTOFFICE + ADMIN • Foodtruck Manuals (Pizza demo)
 * ----------------------------------------------------
 * - Frontoffice: read-only weergave + checklists met lokale voortgang per dag
 * - Admin: inline bewerken (truck, menu, infra, apparatuur, checklists, logistiek, bijzonderheden)
 * - CRUD voor trucks, menu, apparatuur, checklists én paklijst
 * - Hash-router zodat dit als statische website kan draaien
 * - Opslaan = placeholder (console.log payload)
 *
 * ✅ Paklijst afvinken per dag (localStorage)
 * ✅ Paklijst categorieën + CSV-export
 */

/** @typedef {{ id:string, text:string, required?:boolean }} ChecklistItem */
/** @typedef {{ id:string, naam:string, prijs?:string, beschrijving?:string, allergenen?:string[], fotoUrl?:string }} MenuItem */
/** @typedef {{ id:string, naam:string, aantal?:number, eenheid?:string, opmerking?:string, verplicht?:boolean, categorie?:string }} PakItem */
/** @typedef {{
 *   id:string, naam:string, beschrijving?:string, actief:boolean, fotoTruckUrl?:string,
 *   infra:{ stroom:string, water?:string, gas?:string },
 *   menu:MenuItem[],
 *   apparatuur:{ id:string, naam:string, specs?:string, opmerking?:string }[],
 *   logistiek?:string,
 *   opbouw:ChecklistItem[],
 *   afbouw:ChecklistItem[],
 *   bijzonderheden?:string,
 *   paklijst?:PakItem[]
 * }} Manual */

// ——— Helpers / Demo
const uid = () => Math.random().toString(36).slice(2, 9);
function storageKey(truckId, section) {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return `frontoffice:${truckId}:${section}:${date}`;
}
const ADMIN_KEY = "frontoffice:admin:auth";

// ——— Demo data
/** @type {Manual[]} */
const DEMO_TRUCKS = [
  {
    id: "gemaal",
    naam: "Gemaal – Frituurwagen",
    beschrijving: "Frites, loaded fries & haute frituur. 2× Pitco, afzuigkap verplicht aan, koeling in wagen.",
    actief: true,
    fotoTruckUrl: "",
    infra: { stroom: "1x16A (afzuigkap/koelingen)", water: "Wasbak met jerrycan (aan-/afvoer)", gas: "4× propaanflessen in dissel" },
    menu: [
      { id: uid(), naam: "Verse friet", prijs: "€4,50", beschrijving: "Dubbel gebakken", allergenen: ["gluten"] },
      { id: uid(), naam: "Loaded Fries", prijs: "€8,50", beschrijving: "Cheddar, jalapeño, crispy onions", allergenen: ["gluten", "lactose"] },
      { id: uid(), naam: "Haute frituur special", prijs: "€9,50", beschrijving: "Seizoenswissel – vraag de chef", allergenen: [] },
    ],
    apparatuur: [
      { id: uid(), naam: "Pitco friteuse #1", specs: "Gasgestookt", opmerking: "Dagelijks oliecheck" },
      { id: uid(), naam: "Pitco friteuse #2", specs: "Gasgestookt", opmerking: "Dagelijks oliecheck" },
      { id: uid(), naam: "Afzuigkap", specs: "1x16A", opmerking: "Moet AAN bij gebruik friteuses" },
      { id: uid(), naam: "Koeling", specs: "0–4°C", opmerking: "Temperatuur loggen" },
    ],
    logistiek: "Aanhanger – controleer gasflessen (4×) vastgezet in dissel. Parkeerplek 6m. Vetafscheider indien locatie vereist.",
    opbouw: [
      { id: uid(), text: "Plaats waterpas, wielkeggen", required: true },
      { id: uid(), text: "Gasflessen openen en lekcheck (zeepproef)", required: true },
      { id: uid(), text: "Afzuigkap inschakelen vóór ontsteken friteuses", required: true },
      { id: uid(), text: "Koelingen aan en temp. controleren" },
      { id: uid(), text: "Mise-en-place: sauzen, toppings, bakjes" },
    ],
    afbouw: [
      { id: uid(), text: "Friteuses uitschakelen, olie laten afkoelen", required: true },
      { id: uid(), text: "Afzuigkap uit na afkoelen", required: true },
      { id: uid(), text: "Gasflessen dicht + beveiliging vast" },
      { id: uid(), text: "Koelingen reinigen, temp. loggen" },
      { id: uid(), text: "Afval/vetrestanten volgens locatievoorschrift afvoeren" },
    ],
    bijzonderheden: "Brandblusser 6kg + blusdeken nabij frituur. Let op slipgevaar bij vetlekkage.",
    paklijst: [
      { id: uid(), naam: "Handschoenen", aantal: 2, eenheid: "doos", verplicht: true, categorie: "Hygiëne" },
      { id: uid(), naam: "Vetabsorptie korrels", aantal: 1, eenheid: "zak", categorie: "Schoonmaak" },
      { id: uid(), naam: "Schoonmaakdoeken", aantal: 10, eenheid: "stuks", categorie: "Schoonmaak" },
    ],
  },
  {
    id: "storm",
    naam: "Storm – Schaftwagen",
    beschrijving: "Wraps en bowls – snelle service voor bouw-/crewlocaties.",
    actief: true,
    fotoTruckUrl: "",
    infra: { stroom: "1x16A (koeling/werkbank)", water: "Wasbak met jerrycan", gas: "n.v.t." },
    m
