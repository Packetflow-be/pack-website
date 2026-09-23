---
title: "Gasten- en kassanetwerk scheiden in de horeca"
description: "Gasten op hetzelfde netwerk als uw kassa is een veiligheidsrisico. Waarom netwerksegmentatie in de horeca noodzakelijk is en hoe het in de praktijk werkt."
pubDate: 2026-06-30
updatedDate: 2026-09-23
tags: ["Netwerk", "Horeca", "Beveiliging"]
leadForm: true
leadCampaign: "blog-kassanetwerk-scheiden-horeca"
faqs:
  - question: "Waarom moet ik mijn kassanetwerk scheiden van mijn gastenwifi?"
    answer: "Uw kassasysteem verwerkt betalingsgegevens. Als een gast of een besmet apparaat toegang krijgt tot hetzelfde netwerk, kan het kassasysteem bereikbaar zijn. Dat is een risico voor betaalgegevens, bedrijfscontinuïteit en GDPR-compliance."
  - question: "Wat is netwerksegmentatie?"
    answer: "Netwerksegmentatie betekent dat u uw netwerk opdeelt in afzonderlijke, geïsoleerde zones, elk met eigen toegangsregels. Gasten zien enkel internet. Uw kassa en reservatiesysteem zitten in een apart segment dat voor gasten onzichtbaar en onbereikbaar is."
  - question: "Is dit duur of ingewikkeld?"
    answer: "Voor een kleine zaak met de juiste apparatuur is het een eenmalige configuratie. U hebt een beheerde switch en een toegangspunt nodig dat meerdere draadloze netwerken ondersteunt. Daarna draait het vanzelf, zonder dagelijks beheer van uw kant."
  - question: "Geldt dit ook voor een gastenverblijf of B&B?"
    answer: "Zeker. In een B&B of hotel geldt exact hetzelfde principe, met twee extra aandachtspunten: QoS zodat geen enkele gast het netwerk monopoliseert, en clientisolatie zodat gasten elkaars apparaten niet kunnen bereiken. Uw eigen systemen staan sowieso in een apart segment."
---

Stel: een gast verbindt met uw wifi. Zijn laptop is geïnfecteerd met malware. Niet zijn schuld: hij weet het zelf niet eens. Maar ondertussen draait uw kassasysteem op hetzelfde netwerk. Twee apparaten, één netwerk, en een probleem.

Dit is geen theoretisch scenario. Het is de realiteit in de meeste kleine horecazaken in België, en het is oplosbaar.

## Het probleem met één netwerk

De meeste restauranthouders, cafés en logiesuitbaters starten met wat de internetprovider meelevert: één router, één wachtwoord voor gasten, hetzelfde netwerk voor de kassa, de muziekinstallatie, de reservatiesoftware en de tablet achter de bar.

Praktisch op het eerste gezicht. Maar het betekent dat elk apparaat op dat netwerk elk ander apparaat kan bereiken. Een gast die op uw wifi zit, staat technisch op hetzelfde segment als uw kassa. Dat hoeft geen kwade opzet te zijn: malware doet het vanzelf.

De risico's zijn concreet:

- **Betaalgegevens bereikbaar.** Kassasystemen en betaalterminals verwerken financiële data. Netwerktoegang vanuit een ander apparaat maakt afluisteren of gerichte aanvallen mogelijk.
- **Uitval van uw kassa.** Een gast die uw netwerk overspoelt met verkeer, bewust of via een geïnfecteerd apparaat, kan uw kassasysteem traag maken of laten vastlopen op het drukste moment.
- **GDPR-risico.** Reservatiesoftware bevat persoonsgegevens van klanten. Als die bereikbaar is vanuit het gastensegment, hebt u een beveiligingsprobleem dat u moet kunnen verantwoorden.

## Wat netwerksegmentatie betekent

Netwerksegmentatie is de oplossing. U deelt uw netwerk op in gescheiden zones, elk met eigen regels over wie wat mag bereiken.

In een typische horecazaak ziet dat er zo uit:

**Gastennetwerk**: toegang tot internet, niks anders. Geen printers, geen kassa, geen NAS. Gasten zien alleen internet, en dat is precies wat ze nodig hebben.

**Bedrijfsnetwerk**: uw kassa, betaalterminal, reservatiesoftware, printers. Onzichtbaar voor gasten. Enkel uw eigen apparaten hebben toegang.

**Beheersnetwerk** (optioneel maar aanbevolen): IP-camera's, NAS, netwerkapparatuur zelf. Volledig afgeschermd, ook voor uw eigen medewerkers die dat niet nodig hebben.

Technisch gebeurt dit via **VLAN's** (Virtual Local Area Networks) en toegangspunten die meerdere draadloze netwerken (SSID's) tegelijk uitzenden. Voor gasten ziet het er identiek uit: ze verbinden gewoon met "Gasten-WiFi". Op de achtergrond lopen ze in een volledig geïsoleerde omgeving.

## Wat u daarvoor nodig hebt

Een standaard ISP-router ondersteunt dit doorgaans niet. U hebt twee dingen nodig:

1. Een **beheerde switch** die VLAN's begrijpt en het verkeer correct scheidt.
2. Een **professioneel toegangspunt** (access point) dat meerdere SSID's kan uitzenden op afzonderlijke VLAN's.

Voor een kleine zaak is dit een eenmalige installatie. Daarna draait het automatisch. Nieuwe apparaten die u aan het gastennetwerk koppelt, kunnen uw bedrijfssystemen sowieso niet bereiken. Dit is precies het soort werk dat ik doe bij een [professionele wifi- en netwerkinstallatie](/diensten/zakelijke-wifi-netwerken). Voor horecazaken in en rond Jabbeke werk ik dat concreet uit als [WiFi-installatie voor horeca in Jabbeke](/wifi-installatie-horeca-jabbeke), met een gescheiden kassanetwerk als vast onderdeel.

## PCI DSS: de betaalnorm die zelden wordt uitgelegd

Accepteert u betaalkaarten, dan raakt u aan **PCI DSS**, de internationale norm voor veilig kaartbetalen. Die norm geldt voor elk systeem dat in verbinding staat met uw betaalomgeving. Zonder scheiding valt dus uw hele netwerk eronder, gastenwifi incluis. Met een gescheiden netwerk beperkt u dat tot de betaalomgeving zelf. Segmentatie is daarom de eenvoudigste manier om aan de norm te voldoen.

In de praktijk wordt dit voor kleine zaken zelden gecontroleerd, tot er iets misloopt. Een datalek bij een betaalterminal kan leiden tot aansprakelijkheid bij uw payment service provider en kostelijke forensische audits. Voorkomen is een stuk goedkoper dan herstellen.

## Het voordeel voor uw gasten

Netwerksegmentatie is niet alleen beter voor uw beveiliging. Het is ook beter voor uw gasten.

### QoS: eerlijke bandbreedte voor iedereen

Op een standaard gedeeld netwerk bepaalt wie het hardst trekt, wie de snelste verbinding krijgt. Eén gast die een grote download start of een 4K-stream bekijkt, kan de verbinding voor iedereen vertragen, ook die van uw kassasysteem op het drukste moment van de avond.

Met **QoS** (Quality of Service) verdeelt de router de beschikbare bandbreedte eerlijk over de verbonden apparaten. Elke gast krijgt een redelijk deel; niemand kan het netwerk monopoliseren. Uw bedrijfsnetwerk krijgt voorrang, zodat een downloadende gast op het terras uw kassa niet vertraagt. Voor B&B's, hotels en logiesuitbaters is dit bijzonder relevant: meerdere gasten tegelijk verbonden, en u wilt niet dat één apparaat de beleving van iedereen verpest. Meer over volledige dekking en tevreden gasten in een gastenverblijf leest u in [WiFi voor een B&B](/blog/wifi-bnb-volledige-dekking).

### Clientisolatie: gasten zien alleen internet

Op een standaard gastennetwerk kunnen apparaten van verschillende gasten elkaar bereiken. Dat is een privacyprobleem: een gast met de juiste kennis kan bestanden of apparaten van andere gasten benaderen via het lokale netwerk.

Met **clientisolatie** ingeschakeld, ziet elk apparaat op het gastennetwerk enkel het internet, nooit een ander gastapparaat. Gasten zijn volledig van elkaar afgeschermd, ook al zitten ze op dezelfde wifi. Voor een verblijf dat gasten privacy garandeert, is dit geen optie maar een vereiste.

Samen met VLAN-segmentatie levert dat drie lagen bescherming: gasten zijn gescheiden van uw bedrijfsnetwerk, van de beheerslaag, én van elkaar.

## Is uw netwerk veilig ingericht?

Als u niet zeker bent of uw kassa en gastennetwerk gescheiden zijn, is het antwoord bijna zeker nee. De meeste standaardinstallaties zijn dat niet.

Een netwerkinspectie is vrijblijvend en gratis, en duurt doorgaans een half uur ter plaatse. Vul hieronder kort in hoe uw zaak eruitziet, dan plan ik graag een bezoek in.
